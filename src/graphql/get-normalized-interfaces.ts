import {
  GraphQLInterfaceType,
} from 'graphql';
import { NormalizedTypeInput } from '../interfaces';
import { getNormalizedType } from '.';

export const getNormalizedInterfaces = (interfaces: readonly GraphQLInterfaceType[], args: NormalizedTypeInput) => {
  return interfaces.map(interfaceDef => getNormalizedType({
    ...args,
    namedType: interfaceDef,
    typeName: interfaceDef.name
  }) as GraphQLInterfaceType)
}