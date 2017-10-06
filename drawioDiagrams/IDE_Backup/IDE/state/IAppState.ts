import { Dispatch } from 'react-redux';
import { IIDEState } from './IIdeState';

export interface IAppState {
  StatusText?: string;
  IdeState?: IIDEState;
  dispatch?: Dispatch<{}>;
}
