import { INode } from './INode';
import { IAppResources } from './IAppResources';
import { IHash } from './IHash';
import { IViewItem } from './IViewItem';

export interface IAppState {
  project: {
    projectData: { name: string },
    nodes: IHash<INode>,
  };
}