import { IVector2 } from './IVector2';

export enum NodeType {
  Unknown,
  Value,
  Function,
  Object,
}

export interface INode {
  id: string;
  name: string;
  nodeType: NodeType;
  size: IVector2;
  position: IVector2;
}