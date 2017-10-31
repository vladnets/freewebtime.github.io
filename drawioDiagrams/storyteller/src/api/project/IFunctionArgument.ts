import { IReference } from './IReference';
import { IUniqueObject } from '../IUniqueObject';

export interface IFunctionArgument extends IUniqueObject {
  type: IReference;
  isRequired?: boolean;
}