import {
  GraphQLNamedType,
  GraphQLList,
  GraphQLOutputType,
} from 'graphql';
import { NormalizedTypeInput } from '../interfaces';
import { getNormalizedType } from '.';

export const getNormalizedList = (list: GraphQLOutputType, args: NormalizedTypeInput) => {
  const { typeNameNormalizationMap } = args;

  const wrappedType = (list as GraphQLList<GraphQLNamedType>).ofType;
  if (typeNameNormalizationMap[wrappedType.name]) {
    const normalizedWrappedType = getNormalizedType(({
      ...args,
      namedType: wrappedType,
      typeName: wrappedType.name
    }));
    return new GraphQLList(normalizedWrappedType)
  }

  return list;
}