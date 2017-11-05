import { IVector2 } from '../IVector2';
import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';
import { IGraphNode, IReference } from '../graph/IGraph';

export interface IProject extends IGraphNode {
  selectedNode?: IReference;
  socketsPositions?: {
    input: IHash<IVector2>,
    output: IHash<IVector2>,
  }
}
