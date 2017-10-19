import { IAppResources } from './IAppResources';
import { IHash } from './IHash';
import { IViewItem } from './IViewItem';

export interface IAppState {
  project: {
    projectData: any,
    nodes: any,
  };
}