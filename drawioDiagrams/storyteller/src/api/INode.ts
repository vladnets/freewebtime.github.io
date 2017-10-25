import { IHash } from './IHash';
import { IVector2 } from './IVector2';

export interface IUniqueObject {
  id: string;
  name: string;
}

export interface ITypeReference extends IUniqueObject {
  typeId: string;
  moduleId?: string;
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

export interface IReference extends IUniqueObject {
  referenceId: string;
  moduleId?: string;
}

export interface IValue {
  reference?: IReference;
  value?: any;
}

export interface IFunctionCall extends IUniqueObject {
  functionId: string;
  args: IHash<IValue>;
}

export interface IFunction extends IUniqueObject {
  outputType: ITypeReference;
  locals: IHash<IFunctionCall>;
  input: IHash<ITypeReference>;
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
    types: IHash<ITypeReference>, 
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
