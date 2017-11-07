import { IProject } from './project/IProject';
import { IAppResources } from './IAppResources';
import { IHash } from './IHash';
import { IVector2 } from './IVector2';

export interface ISocketsData {
  visibleSockets: IHash<string>;
  socketsPositions: IHash<IVector2>;
}

export interface IAppState {
  project: IProject;
  socketsData: ISocketsData;
  resources: IAppResources;
}

