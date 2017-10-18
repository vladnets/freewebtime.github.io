import { NodeType } from './NodeType';
import { IVector2 } from '../IVector2';
import { IHash } from '../IHash';

export interface INode {
  id: string;
  type: NodeType;
  name: string;
  context: INode|undefined;
  input: IHash<INode>;
  value: IHash<INode>;
  content: any|IHash<INode>;
}
