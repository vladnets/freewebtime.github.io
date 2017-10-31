import { IHash } from './IHash';
import { IVector2 } from './IVector2';
import { IUniqueObject } from './IUniqueObject';

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
