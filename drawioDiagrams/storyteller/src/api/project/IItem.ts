import { ISymbol } from './ISymbol';
import { IUniqueObject } from '../IUniqueObject';
import { IReference } from './IReference';
import { IHash } from '../IHash';

export enum ItemType {
  Primitive,
  Structure,
  FunctionCall,
  Graph,
}

export interface IItem extends ISymbol {
  itemType: ItemType;
  interface: IReference;
}

export interface IPrimitiveItem extends IItem {
  input: IReference;
}

export interface IStructureItem extends IItem {
  input: IHash<IReference>;
}

export interface IGraph extends IStructureItem {
  locals: IHash<IReference>;
  returnsConnections: IHash<IReference>;
  localsConnections: IHash<IReference>;
}

export interface IFunctionCall extends IItem {
  paramsConnections: IHash<IReference>;
  functionBody: IReference;
}