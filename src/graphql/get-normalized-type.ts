import {
  GraphQLInterfaceType,
  GraphQLUnionType,
  GraphQLObjectType,
  GraphQLScalarType,
} from 'graphql';
import { NormalizedTypeInput } from '../interfaces';
import { 
  getNormalizedUnionType,
  getNormalizedObjectType,
  getNormalizedInterfaceType
} from '.';

export const getNormalizedType = (args: NormalizedTypeInput) => {
  const { namedType, typeName, typeNameNormalizationMap, resolvedMemo } = args;

  if (!typeNameNormalizationMap[typeName]) {
    resolvedMemo[typeName] = namedType
    return namedType;
  }

  switch (namedType.constructor) {
    case GraphQLUnionType:
      return getNormalizedUnionType(args);
    case GraphQLObjectType:
      return getNormalizedObjectType(args);
    case GraphQLInterfaceType:
      return getNormalizedInterfaceType(args);
    case GraphQLScalarType:
      resolvedMemo[typeName] = namedType
      return namedType;
    default:
      console.log('Unhandled type: ', args.namedType);
      return args.namedType;
  }
}