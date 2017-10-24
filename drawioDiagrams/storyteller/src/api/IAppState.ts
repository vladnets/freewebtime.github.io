import { IFunction, INode, IType } from './INode';
import { IAppResources } from './IAppResources';
import { IHash } from './IHash';
import { IViewItem } from './IViewItem';

export interface IAppState {
  project: IProject;
  resources: IAppResources;
}

export interface IProject {
  projectData: IProjectData;
  projectItems: IHash<IProjectItem>;
  nodes: IHash<INode>;
  types: IHash<IType>;
  functions: IHash<IFunction>;
}

export interface IProjectData {
  name: string;
  selectedNodeId: string;
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