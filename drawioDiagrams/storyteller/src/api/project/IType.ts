import { IReference } from './IReference';
import { IHash } from '../IHash';
import { TypeCategory } from './TypeCategory';
import { IUniqueObject } from '../IUniqueObject';

export interface IType extends IUniqueObject {
  category: TypeCategory;
  fields?: IHash<IReference>;
}