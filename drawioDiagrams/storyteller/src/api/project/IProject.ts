import { IProjectStructureItem } from './IProjectStructureItem';
import { ICard } from './ICard';
import { ISymbol } from './ISymbol';
import { IUniqueObject } from '../IUniqueObject';
import { IInterface } from './IInterface';
import { IHash } from '../IHash';
import { IItem } from './IItem';
import { ICardboard } from './ICardboard';

export interface IProject extends IUniqueObject {
  interfaces: IHash<string>;
  objects: IHash<string>;
  
  symbols: IHash<ISymbol>;
  cardboards: IHash<ICardboard>;

  structure: IHash<IProjectStructureItem>;
}