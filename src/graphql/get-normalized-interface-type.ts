import {
  GraphQLInterfaceType,
} from 'graphql';
import { NormalizedTypeInput } from '../interfaces';
import {
  getNormalizedInterfaces,
  getNormalizedFields
} from '.';

export const getNormalizedInterfaceType = (args: NormalizedTypeInput) => {
  const { namedType, typeName, typeNameNormalizationMap, resolvedMemo } = args;

  if (resolvedMemo[typeName]) {
    return resolvedMemo[typeName];
  }

  const type = namedType as GraphQLInterfaceType;

  const result: GraphQLInterfaceType = new GraphQLInterfaceType({
    name: type.name === typeName ? typeNameNormalizationMap[typeName] : type.name,
    interfaces: getNormalizedInterfaces(type.getInterfaces(), args),
    fields: () => getNormalizedFields(type.getFields(), args)
  });

  resolvedMemo[typeName] = result;

  return result;
}