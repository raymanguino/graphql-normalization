import {
  GraphQLNamedType,
} from 'graphql';

export interface NormalizedTypeInput {
  namedType: GraphQLNamedType,
  typeName: string,
  typeNameNormalizationMap: Record<string, string>,
  resolvedMemo: Record<string, GraphQLNamedType>
}