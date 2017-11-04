import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';
import { IGraphNode } from '../graph/IGraph';

export interface IProject extends IUniqueObject {
  modules: IHash<IGraphNode>;
  imports: IHash<IGraphNode>;

  selectedModuleId?: string;
}
