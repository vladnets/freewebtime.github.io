import { IUniqueObject } from '../IUniqueObject';

export enum SymbolType {
  Interface = 'Interface',
  Item = 'Item',
}

export interface ISymbol extends IUniqueObject {
  namespace?: string;
  fullId: string;
  symbolType: SymbolType;
}