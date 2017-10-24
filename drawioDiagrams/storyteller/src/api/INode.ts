import { IHash } from './IHash';
import { IVector2 } from './IVector2';

export interface IUniqueObject {
  id: string;
  name: string;
}

export interface ITypeReference extends IUniqueObject {
  typeId: string;
}
export enum TypeCategory {
  Value,
  Object,
  Function,
  Constant,
}

export interface IType extends IUniqueObject {
  category: TypeCategory;

  properties?: IHash<ITypeReference>;
}

export interface IConnection extends IUniqueObject {
  fromId: string;
  toId: string;
}

export interface IConnectionReference {
  connectionId: string;
}

export interface IFunction extends IUniqueObject {
  outputTypeId: string;
  locals: IHash<ITypeReference>;
  input: IHash<ITypeReference>;
  output: IHash<ITypeReference>;
  connections: IHash<IConnection>;
  connectionsFrom: IHash<IHash<IConnectionReference>>; //connections sorted by 'fromId' field
  connectionsTo: IHash<IHash<IConnectionReference>>; //connections sorted by 'toId' field
}

export enum NodeType {
  Unknown,
  Value,
  Function,
  Type,
}

export interface INode extends IUniqueObject {
  reference?: string;
  nodeType: NodeType;
  size: IVector2;
  position: IVector2;
}
