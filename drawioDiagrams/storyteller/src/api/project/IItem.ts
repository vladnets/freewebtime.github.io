import { ISymbol } from './ISymbol';
import { IUniqueObject } from '../IUniqueObject';
import { IReference } from './IReference';
import { IHash } from '../IHash';

export enum ItemType {
  Primitive = 'Primitive',
  Structure = 'Structure',
  FunctionCall = 'FunctionCall',
  SourceCode = 'SourceCode',
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

export enum SourceCodeType {
  System = 'System',
  Graph = 'Graph',
}

export interface ISourceCodeInterface extends IItem {
  sourceCodeType: SourceCodeType;
}

export interface ISystemSourceCodeInterface extends ISourceCodeInterface {
  functionId: string;  
}
  
export interface IGraphSourceCodeInterface extends ISourceCodeInterface {
  locals: IHash<IReference>;//name:type
  connections: IHash<IReference>;
}
  