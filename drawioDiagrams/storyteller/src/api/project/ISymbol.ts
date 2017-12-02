import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';

export enum SymbolType {
  Unknown = 'Unknown',
  Object = 'Object',
  FunctionCall = 'FunctionCall',
  SourceCode = 'SourceCode',
  Primitive = 'Primitive',
  Structure = 'Structure',
  Function = 'Function',
}

export interface ISymbol extends IUniqueObject {
  namespace?: string;
  fullId: string;
  symbolType: SymbolType;
}

export interface IObjectOld extends ISymbol {
  objectTypeId: string;
  subitems?: IHash<string>;
  value?: any;
  sourceId?: string;
}

export interface IFunctionCall extends IObjectOld {
}

export enum SourceCodeType {
  System = 'System',
  Graph = 'Graph',
}

export interface ISourceCode extends ISymbol {
  sourceCodeType: SourceCodeType;
}

export interface ISystemSourceCode extends ISourceCode {
  functionId: string;  
}
  
export interface IGraphSourceCode extends ISourceCode {
  locals: IHash<string>;//name:type
  connections: IHash<string>;
}

export interface IPrimitiveOld extends ISymbol {
  primitiveType: string;
  defaultValue: any;
}

export interface IStructureOld extends ISymbol {
  subitems: IHash<string>; //name:typeId
}

export interface IFunctionOld extends ISymbol {
  paramsTypeId: string;
  resultTypeId: string;
}