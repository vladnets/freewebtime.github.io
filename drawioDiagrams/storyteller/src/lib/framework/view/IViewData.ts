import { IAction } from '../actions/IAction';
import { ITheme } from './Theme';

export interface IViewData {
  styleName?: string,
  displayMode?: string,
  theme?: ITheme,
  callback(action: IAction): void
}