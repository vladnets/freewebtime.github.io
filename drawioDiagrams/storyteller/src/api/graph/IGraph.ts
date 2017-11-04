import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';

export enum GraphNodeType {
  Primitive,
  Construction,
  Function,
}

export enum ReferenceType {
  Relative,
  Global,
}

export interface IReference {
  referenceType: ReferenceType;
  referencePath: string;
}

export interface IGraphNode extends IUniqueObject {
  nodeType: GraphNodeType;
  imports: IHash<IReference>;
  typeReference: IReference;
  inputReference: IReference;
  subnodes: IHash<IGraphNode>;
}

export interface IPrimitiveNode extends IGraphNode {
  primitiveType: string;
}

export interface IConstructionNode extends IGraphNode {
  items: IHash<string>; //keys to the subnodes hashset
}

export interface IFunctionNode extends IGraphNode {
  input: IHash<string>; //keys to the subnodes hashset
  output: IHash<string>; //keys to the subnodes hashset
  locals: IHash<string>; //keys to the subnodes hashset
  function?: (node: IFunctionNode, root: IFunctionNode) => any;
}