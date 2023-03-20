import { buildSchema } from 'graphql';
import { SYS_TYPE_PREFIX } from '../common/constants';

export const getTypeNames = (schemaSDL: string) => {
  const schema = buildSchema(schemaSDL);
  const typeMap = schema.getTypeMap();

  return Object.keys(typeMap)
    .filter(key => !typeMap[key].name.startsWith(SYS_TYPE_PREFIX));
};