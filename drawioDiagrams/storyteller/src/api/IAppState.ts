import { IProjectOld } from './project/IProject';
import { IAppResources } from './IAppResources';
import { IHash } from './IHash';
import { IVector2 } from './IVector2';

export interface ISocketsData {
  visibleSockets: IHash<string>;
  socketsPositions: IHash<IVector2>;
  graphPosition: IVector2;
}

export interface IAppState {
  projectOld: IProjectOld;
  socketsData: ISocketsData;
  resources: IAppResources;
}

export interface IConnection {
  connectionId: string;
  fromNodeId: string;
  toNodeId: string;
  fromNodeFullId: string;
  toNodeFullId: string;
  fromPos?: IVector2;
  toPos?: IVector2;
}