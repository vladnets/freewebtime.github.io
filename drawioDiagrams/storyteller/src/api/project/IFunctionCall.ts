import { IReference } from './IReference';
import { IUniqueObject } from '../IUniqueObject';
import { IMember } from './IMember';
import { IHash } from '../IHash';

export interface IFunctionCall extends IUniqueObject {
  resultType: IReference;
  args: IHash<IMember>;
}