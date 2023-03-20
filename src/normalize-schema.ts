
import {
  getTypeNames,
  getNormalizedSchema
} from './graphql';
import { SchemaConfig } from './interfaces';

const getTypeNameSourceIdMap = (
  schemaConfigs: Partial<SchemaConfig>[]
) => {
  const result: {[key: string]: string} = {};
  schemaConfigs.map(schemaConfig => {
    const typeNames = getTypeNames(schemaConfig.schema as string);
    for (const typeName of typeNames) {
      result[typeName] = schemaConfig.sourceId as string
    }
  })
  return result;
}

export const normalizeSchema = (
  sourceId: string, 
  normalizationPrefix: string, 
  schemaSDLToNormalize: string, 
  existingSchemaConfigs: SchemaConfig[]
) => {
  try {
    const typeNames = getTypeNames(schemaSDLToNormalize);

    const existingTypeNameSourceIdMap = getTypeNameSourceIdMap(existingSchemaConfigs);

    const ownSubSchemaSDL = existingSchemaConfigs.find(existingSchemaConfig => existingSchemaConfig.sourceId === sourceId);
    const ownExistingTypeNames = ownSubSchemaSDL?.schema && getTypeNames(ownSubSchemaSDL.schema);
    
    const normalizedTypeNamesMap: Record<string, string> = {};

    for (const typeName of typeNames) {
      // If typeName is not already defined then there is no collision
      if (!existingTypeNameSourceIdMap[typeName]) continue;
      
      // If typeName is defined for this sourceId then there is no collision
      if (ownExistingTypeNames && Object.keys(ownExistingTypeNames).includes(typeName)) continue;

      /*
       * Type name collision confirmed. We now try to normalize with a new type name
       */
      const newTypeName = `${normalizationPrefix}${typeName}`;

      // Check if prefixed type name is already defined
      const existingSourceId = existingTypeNameSourceIdMap[newTypeName];
      if (existingSourceId) {
        /*
         * Prefixed type name collision confirmed. We now compare priorities
         */
        throw Error(`Unable to normalize Type name. Type ${newTypeName} already exists and has higher priority.`);
      } 

      normalizedTypeNamesMap[typeName] = newTypeName;
    }

    return getNormalizedSchema(schemaSDLToNormalize, normalizedTypeNamesMap);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
