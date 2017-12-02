import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';
import { ICard } from './ICard';

export interface IProject extends IUniqueObject {
  cards: IHash<ICard>;
}