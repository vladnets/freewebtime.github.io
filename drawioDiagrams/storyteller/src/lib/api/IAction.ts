import { IObject } from './IObject';

export interface IAction extends IObject {
  type: string,
  payload?: any
}