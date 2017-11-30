import { IHash } from '../IHash';
import { IProjectStructureItem } from './IProjectStructureItem';

export interface IProjectStructure {
  items: IHash<IProjectStructureItem>;
  rootItems: IHash<string>;
}