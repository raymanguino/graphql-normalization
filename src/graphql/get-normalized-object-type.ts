import {
  GraphQLObjectType,
} from 'graphql';
import { NormalizedTypeInput } from '../interfaces';
import {
  getNormalizedInterfaces,
  getNormalizedFields
} from '.'

export const getNormalizedObjectType = (args: NormalizedTypeInput) => {
  const { namedType, typeName, typeNameNormalizationMap, resolvedMemo } = args;

  if (resolvedMemo[typeName]) {
    return resolvedMemo[typeName];
  }

  const type = namedType as GraphQLObjectType;

  const result: GraphQLObjectType = new GraphQLObjectType({
    name: type.name === typeName ? typeNameNormalizationMap[typeName] : type.name,
    interfaces: getNormalizedInterfaces(type.getInterfaces(), args),
    fields: () => getNormalizedFields(type.getFields(), args)
  });

  resolvedMemo[typeName] = result;

  return result;
}