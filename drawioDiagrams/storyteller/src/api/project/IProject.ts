import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';
import { IGraphNode, IReference } from '../graph/IGraph';

export interface IProject extends IGraphNode {
  selectedNode?: IReference;
}
