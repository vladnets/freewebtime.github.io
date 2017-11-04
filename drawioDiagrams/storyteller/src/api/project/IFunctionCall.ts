import { IReference } from './IReference';
import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';
import { IObject } from './IObject';

export interface IFunctionCall extends IUniqueObject {
  resultType: IReference;
  args: IHash<IObject>;
}