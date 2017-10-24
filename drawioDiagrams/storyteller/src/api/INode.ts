import { IHash } from './IHash';
import { IVector2 } from './IVector2';

export enum NodeType {
  Unknown,
  Value,
  Function,
  Type,
}

export enum TypeCategory {
  Value,
  Object,
}

export interface ITypeField {
  id: string;
  name: string;
  typeId: string;
  isArray: boolean;
  value?: any;
}

export interface IType {
  id: string;
  name: string;
  category: TypeCategory;

  fields?: IHash<ITypeField>;
  colorRgba?: number[];
}

export interface ITypeFieldValue {
  id: string;
  name: string;
  fieldId: string;
  reference?: string|string[];
  value?: any;
}

export interface IFunction {
  id: string;
  name: string;
  outputTypeId: string;
  arguments: IHash<ITypeField>;
  locals: IHash<ITypeField>;
  values: IHash<ITypeFieldValue>; 
}

export interface INode {
  id: string;
  name: string;
  nodeType: NodeType;
  references?: string|string[];
  size: IVector2;
  position: IVector2;
  input?: IHash<INode>;
  output?: IHash<INode>;
  locals?: IHash<INode>;
}

export interface INodeMember {
  id: string;
  name: string;
  reference?: string|string[];
  value: INode|IHash<INodeMember>;
}