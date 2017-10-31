import { IProject } from './project/IProject';
import { IAppResources } from './IAppResources';

export interface IAppState {
  project: IProject;
  resources: IAppResources;
}

