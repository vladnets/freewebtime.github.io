import { IProjectStructureItem } from './IProjectStructureItem';
import { ICard } from './ICard';
import { ISymbol } from './ISymbol';
import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';
import { ICardboard } from './ICardboard';
import { IProjectStructure } from './IProjectStructure';

export interface IProject extends IUniqueObject {
  symbols: IHash<ISymbol>;
  cardboards: IHash<ICardboard>;

  structure: IProjectStructure;
}