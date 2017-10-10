import { IObject } from './IObject';

export interface IViewContext {
  Theme: any;
  Callback(action: IObject): void;  
}