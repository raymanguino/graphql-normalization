import {
  GraphQLSchema,
  buildSchema,
  printSchema,
  GraphQLNamedType,
} from 'graphql';
import { NormalizedTypeInput } from '../interfaces';
import { getNormalizedType } from '.';

export const getNormalizedSchema = (schemaSDL: string, typeNameNormalizationMap: Record<string, string>) => {
  const schema = buildSchema(schemaSDL);
  const typeMap = schema.getTypeMap();

  const normalizedTypes: Record<string, GraphQLNamedType> = {};

  for (const typeName in typeMap) {
    const args: NormalizedTypeInput = {
      namedType: typeMap[typeName],
      typeName,
      typeNameNormalizationMap,
      resolvedMemo: normalizedTypes
    }
    getNormalizedType(args);
  }

  const normalizedSchema = new GraphQLSchema({
    types: Object.keys(normalizedTypes).map(key => normalizedTypes[key])
  });
  console.log(printSchema(normalizedSchema));
  return printSchema(normalizedSchema);
}