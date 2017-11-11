import { IProjectItem } from './IProjectItem';
import { IHash } from '../IHash';
import { IReference } from './IReference';

export interface IPiModule extends IProjectItem {
  imports: IHash<IReference>;
}