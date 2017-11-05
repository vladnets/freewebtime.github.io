import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';
import { IVector2 } from '../IVector2';

export enum GraphNodeType {
  Primitive,
  Construction,
  Function,
}

export enum ReferenceType {
  Relative,
  Global,
}

export type ReferencePathItem = string|number;
export type ReferencePath = ReferencePathItem[];

export interface IReference {
  referenceType: ReferenceType;
  referencePath: ReferencePath;
  targetFullId: string;
}

export interface IGraphNodeViewData {
  position: IVector2;
  size: IVector2;
  isCollapsed: boolean;
  inputSoketPos?: IVector2;
  outputSoketPos?: IVector2;
}

export interface IGraphNode extends IUniqueObject {
  fullId: string;
  nodeType: GraphNodeType;
  viewData: IGraphNodeViewData;
  imports?: IHash<IReference>;
  typeReference?: IReference;
  inputReference?: IReference;
  subnodes?: IHash<IGraphNode>;
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