import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';
import { ICard } from './ICard';
import { IAction, IGenericAction } from '../IAction';

export interface ICardboard extends IUniqueObject {
  namespace: string;
  cards: IHash<ICard>;
}

export interface ICardboardActionPayload {
  cardboardId: string;
}

export interface ICardboardAction extends IGenericAction<ICardboardActionPayload> {
}