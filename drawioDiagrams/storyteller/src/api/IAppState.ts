import { IFunction, INode, IType, IModule } from './INode';
import { IAppResources } from './IAppResources';
import { IHash } from './IHash';
import { IViewItem } from './IViewItem';

export interface IAppState {
  project: IProject;
  resources: IAppResources;
}

export interface IProject {
  name: string;
  id: string;
  modules: IHash<IModule>;
  rootModuleId: string;
}

export enum ProjectItemType {
  Unknown,
  Folder,
  File,
}

export interface IProjectItem {
  id: string;
  name: string;
  type: ProjectItemType;
  subitems: IHash<IProjectItem>;
}