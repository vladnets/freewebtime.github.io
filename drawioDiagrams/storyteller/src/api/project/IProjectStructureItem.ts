import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';

export interface IProjectStructureItem extends IUniqueObject {
  fullId: string;
  isProjectRoot?: boolean;
  namespace?: string;
  subitems: IHash<string>;
  level: number;
}