import { IObject } from './IObject';
import { IAction } from './IAction';

export interface INode extends IObject {
  input?: any;
  locals?: any;
  output?: any;
  value?: any;
  reference?: string;
  default_value?: any;
  function?: (state: INode, action: IAction) => any;
}