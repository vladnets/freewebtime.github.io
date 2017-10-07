import { IAction } from '../actions/IAction';
import { Theme } from './Theme';

export interface IViewData {
  styleName?: string,
  displayMode?: string,
  theme?: Theme,
  callback(action: IAction): void
}