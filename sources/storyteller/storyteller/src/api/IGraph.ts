import { IGraphNode } from './IGraphNode';
import { IHash } from './IHash';

export interface IGraph {
  nodes: IHash<IGraphNode>;
}