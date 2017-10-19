import { INode } from './INode';
import { IAppResources } from './IAppResources';
import { IHash } from './IHash';
import { IViewItem } from './IViewItem';

export interface IAppState {
  project: IProject;
}

export interface IProject {
  projectData: IProjectData;
  nodes: IHash<INode>;
}

export interface IProjectData {
  name: string;
  selectedNodeId: string;
}