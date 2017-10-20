import { IHash } from './IHash';
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
  referencedId?: string;
  size?: IVector2;
  position?: IVector2;
  input?: IHash<INode>;
  output?: IHash<INode>;
  locals?: IHash<INode>;
}