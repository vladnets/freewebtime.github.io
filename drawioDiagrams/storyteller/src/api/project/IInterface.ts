import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';
import { IReference } from './IReference';

export enum InterfaceType {
  Primitive,
  Object,
  Function,
}

export interface IInterface extends IUniqueObject {
  interfaceType: InterfaceType;
}

export interface IPrimitiveInterface extends IInterface {
  primitiveType: string;
}

export interface IObjectInterface extends IInterface {
  subitems: IHash<IReference>;
}

export interface IFunctionInterface extends IInterface {
  params: IReference;
  returns: IReference;
}
