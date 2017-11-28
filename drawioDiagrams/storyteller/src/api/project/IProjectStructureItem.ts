import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';

export interface IProjectStructureItem extends IUniqueObject {
  subitems: IHash<string>;
}