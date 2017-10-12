import { IObject } from './IObject';

export interface INode extends IObject {
  input?: any;
  locals?: any;
  value?: any;
  reference?: string;
}