import { IAppResources } from './IAppResources';
import { IHash } from './IHash';
import { IProject } from './project/IProject';
import { IViewItem } from './IViewItem';

export interface IAppData {
  content: IViewItem;
  resources: IAppResources;
}