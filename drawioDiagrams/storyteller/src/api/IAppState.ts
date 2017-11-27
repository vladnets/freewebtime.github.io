import { IAppResources } from './IAppResources';
import { IHash } from './IHash';
import { IVector2 } from './IVector2';
import { IProject } from './project/IProject';

export interface IAppState {
  resources: IAppResources;
  project: IProject;
}