import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';
import { ICard } from './ICard';

export interface ICardboard extends IUniqueObject {
  namespace: string;
  cards: IHash<ICard>;
}