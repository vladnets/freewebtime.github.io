import { IAction } from '../actions/IAction';
export interface IViewData {
  itemType?: string,
  styleName?: string,
  id?: string,
  displayMode?: string,
  theme?: any,
  callback(action: IAction): void
}