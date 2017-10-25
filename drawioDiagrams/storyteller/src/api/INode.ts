import { IHash } from './IHash';
import { IVector2 } from './IVector2';

export interface IUniqueObject {
  id: string;
  name: string;
}

export enum TypeCategory {
  Value,
  Object,
  Function,
  Constant,
}

export interface IType extends IUniqueObject {
  category: TypeCategory;

  properties?: IHash<IReference>;
}

export interface IConnection extends IUniqueObject {
  fromId: string;
  toId: string;
}

export interface IConnectionReference {
  connectionId: string;
}

export interface IReference extends IUniqueObject {
  referenceId: string;
  moduleId?: string;
}

export interface IValue {
  reference?: IReference;
  value?: any;
}

export interface IFunctionCall extends IUniqueObject {
  reference: IReference;
  args: IHash<IValue>;
}

export interface IFunction extends IUniqueObject {
  outputType: IReference;
  locals: IHash<IFunctionCall>;
  input: IHash<IReference>;
  output: IHash<IFunctionCall>;
}

export interface IModuleReference extends IUniqueObject {
  moduleId: string;
}

export interface IModule extends IUniqueObject {
  types: IHash<IType>;
  functions: IHash<IFunction>;
  imports: IHash<IModuleReference>;
  exports: {
    types: IHash<IReference>, 
    functions: IHash<IReference>
  },
  nodes: IHash<INode>;
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
