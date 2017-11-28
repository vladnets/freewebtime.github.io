import { ISymbol } from './ISymbol';
import { IUniqueObject } from '../IUniqueObject';
import { IReference } from './IReference';
import { IHash } from '../IHash';

export enum ItemType {
  Object = 'Object',
  FunctionCall = 'FunctionCall',
  SourceCode = 'SourceCode',
}

export interface IItem extends ISymbol {
  itemType: ItemType;
  typeReference: IReference;
}

export interface IObjectItem extends IItem {
  connections: IHash<IReference>;
}

export interface IFunctionCallItem extends IObjectItem {
  locals: IHash<IReference>;
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
  