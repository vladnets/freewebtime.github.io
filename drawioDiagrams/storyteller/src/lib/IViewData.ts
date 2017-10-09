import { IAction } from './IAction';

export interface IViewContext {
  theme: any;
  callback(action: IAction): void;  
}