import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';
import { IReference } from './IReference';
import { IItem } from './IItem';
import { ISymbol } from './ISymbol';

export enum InterfaceType {
  Primitive = 'Primitive',
  Structure = 'Structure',
  Function = 'Function',
}

export interface IInterface extends ISymbol {
  interfaceType: InterfaceType;
}

export interface IPrimitiveInterface extends IInterface {
  primitiveType: string;
}

export interface IStructureInterface extends IInterface {
  subitems: IHash<IReference>;
}

export interface IFunctionInterface extends IInterface {
  params: IReference;
  returns: IReference;
}
