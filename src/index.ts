import { SchemaConfig } from './interfaces';
import { normalizeSchema } from './normalize-schema';

const createSchemaConfigEntry = (
  sourceId: string,
  schema: string,
  priority = 1,
): Partial<SchemaConfig> => ({
  sourceId,
  priority,
  schema
});

const db = [
  createSchemaConfigEntry('id',  `
    type TypedFields {
      mockField1: String!
      mockField2: String!
    }
    type ContentPage {
      relatedArticles: [ContentArticle] 
    }
  
    type ContentArticle {
      entryId: ID!
      # ...other properties
    }
    type ProductArticle {
      mockField1: String!
      mockField2: String!
    }
  `)
] as SchemaConfig[];

export const normalizeSchemaSDL = (sourceId: string, normalizationPrefix: string, schemaSDL: string)=> {
  return normalizeSchema(sourceId, normalizationPrefix, schemaSDL, db);
}