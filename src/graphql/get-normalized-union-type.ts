import {
  GraphQLUnionType,
  GraphQLObjectType,
} from 'graphql';
import { NormalizedTypeInput } from '../interfaces';
import { getNormalizedType } from '.';

export const getNormalizedUnionType = (args: NormalizedTypeInput) => {
  const { namedType, typeName, typeNameNormalizationMap, resolvedMemo } = args;

  if (resolvedMemo[typeName]) {
    return resolvedMemo[typeName];
  }

  const type = namedType as GraphQLUnionType;

  const types = type.getTypes().map(type => getNormalizedType({
    ...args,
    typeName: type.name,
    namedType: type,
  }) as GraphQLObjectType);

  const result: GraphQLUnionType = new GraphQLUnionType({
    name: type.name === typeName ? typeNameNormalizationMap[typeName] : type.name,
    types
  });

  resolvedMemo[typeName] = result;

  return result;
}