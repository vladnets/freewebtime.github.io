import { IHash } from './IHash';
import { NodeType } from './NodeType';
import { IVector2 } from './IVector2';

export interface INode {
  type: NodeType;
  name: string;
  context: INode|undefined;
  position: IVector2;
  size: IVector2;
  input: IHash<INode>;
  value: IHash<INode>;
  content: any|IHash<INode>;
}
