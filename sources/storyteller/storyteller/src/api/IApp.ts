import { IAppData } from './IAppData';
import { IAppResources } from './IAppResources';

export interface IApp {
  resources: IAppResources,
  data: IAppData,
}