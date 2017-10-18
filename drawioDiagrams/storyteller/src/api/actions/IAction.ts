import { IAppData } from '../IAppData';
export interface IAction {
  type: string,
  payload?: any,
  context?: IAppData,
}