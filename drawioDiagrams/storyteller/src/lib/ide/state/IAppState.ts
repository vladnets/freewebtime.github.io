import { Dispatch } from 'react-redux';
import { IIdeState } from './IIdeState';

export interface IAppState {
  StatusText?: string;
  IdeState?: IIdeState;
  dispatch?: Dispatch<{}>;
}
