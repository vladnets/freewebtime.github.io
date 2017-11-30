import { IProjectStructureItem } from './IProjectStructureItem';
import { ICard } from './ICard';
import { ISymbol } from './ISymbol';
import { IUniqueObject } from '../IUniqueObject';
import { IInterface } from './IInterface';
import { IHash } from '../IHash';
import { IItem } from './IItem';
import { ICardboard } from './ICardboard';
import { IProjectStructure } from './IProjectStructure';

export interface IProject extends IUniqueObject {
  interfaces: IHash<string>;
  items: IHash<string>;
  
  symbols: IHash<ISymbol>;
  cardboards: IHash<ICardboard>;

  structure: IProjectStructure;
}