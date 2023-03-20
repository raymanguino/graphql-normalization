import {
  GraphQLNamedType,
  GraphQLOutputType,
  GraphQLNonNull,
} from 'graphql';
import { NormalizedTypeInput } from '../interfaces';
import { getNormalizedType } from '.';

export const getNormalizedNonNull = (nonNull: GraphQLOutputType, args: NormalizedTypeInput) => {
  const { typeNameNormalizationMap } = args;

  const wrappedType = (nonNull as GraphQLNonNull<GraphQLNamedType>).ofType;
  if (typeNameNormalizationMap[wrappedType.name]) {
    const normalizedWrappedType = getNormalizedType(({
      ...args,
      namedType: wrappedType,
      typeName: wrappedType.name
    }));
    return new GraphQLNonNull(normalizedWrappedType);
  }

  return nonNull;
}