import {
  GraphQLNamedType,
  GraphQLList,
  GraphQLOutputType,
  GraphQLInputType,
  GraphQLNonNull,
  GraphQLFieldMap
} from 'graphql';
import { NormalizedTypeInput } from '../interfaces';
import { 
  getNormalizedList,
  getNormalizedNonNull
} from '.';

export const getNormalizedFields = (fields: GraphQLFieldMap<any, any>, args: NormalizedTypeInput) => {
  return Object.keys(fields).reduce((acc, field) => {
    let type: GraphQLInputType | GraphQLOutputType | GraphQLList<GraphQLNamedType>;
    switch (fields[field].type.constructor) {
      case GraphQLList:
        type = getNormalizedList(fields[field].type, args)
        break;
      case GraphQLNonNull: 
        type = getNormalizedNonNull(fields[field].type, args)
        break;
      default:
        type = fields[field].type;
    }
    return ({ 
      ...acc,
      [field]: {
        type
      }
    })
  }, {})
}