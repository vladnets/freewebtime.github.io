import { ReferencePath, ReferencePathItem } from '../api/project/ReferencePath';
import { IHash } from '../api/IHash';
import { appConfig } from '../config/appConfig';
import { ISymbol, SymbolType } from '../api/project/ISymbol';
import { IProject } from '../api/project/IProject';
import { ICardboard } from '../api/project/ICardboard';
import { ICard } from '../api/project/ICard';
import { NColor } from '../api/Color';

export const areObjectsEqual = ( x, y ) => {
  if ( x === y ) return true;
    // if both x and y are null or undefined and exactly the same

  if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) return false;
    // if they are not strictly equal, they both need to be Objects

  if ( x.constructor !== y.constructor ) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

  for ( var p in x ) {
    if ( ! x.hasOwnProperty( p ) ) continue;
      // other properties were tested using x.constructor === y.constructor

    if ( ! y.hasOwnProperty( p ) ) return false;
      // allows to compare x[ p ] and y[ p ] when set to undefined

    if ( x[ p ] === y[ p ] ) continue;
      // if they have the same strict value or identity then they are equal

    if ( typeof( x[ p ] ) !== 'object' ) return false;
      // Numbers, Strings, Functions, Booleans must be strictly equal

    if ( ! areObjectsEqual( x[ p ],  y[ p ] ) ) return false;
      // Objects and Arrays must be tested recursively
  }

  for ( p in y ) {
    if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) return false;
      // allows x[ p ] to be set to undefined
  }
  return true;
}

export const resolveReference = (targetId: string, project: IProject): ISymbol|undefined => {
  return project.symbols[targetId];
}

export const parsePath = (path: string): ReferencePath|undefined => {
  if (!path) {
    return undefined;
  }

  const parts = path.split('.');
  const result = parts.map((sPathItem: string): ReferencePathItem => {
    if (sPathItem.startsWith('[') && sPathItem.endsWith(']')) {
      const sValue = sPathItem.substring(1, sPathItem.length-2);
      const arrayIndex = Number(sValue);
      return arrayIndex !== NaN ? arrayIndex : 0;
    }

    return sPathItem;
  });

  return result;
}

export const pathToString = (path: ReferencePath): string|undefined => {
  if (path.length <= 0) {
    return undefined;
  }

  return path.join('.');
}

export const getSubitemsIds = (namespace: string, project: IProject): IHash<string>|undefined => {
  const structureItem = project.structure.items[namespace];
  if (!structureItem) {
    return undefined;
  }

  return structureItem.subitems;
}

export const getSubitems = (namespace: string, project: IProject): IHash<ISymbol>|undefined => {
  const idList = getSubitemsIds(namespace, project);
  if (!idList) {
    return undefined;
  }

  const result: IHash<ISymbol> = {};
  Object.keys(idList).map((symbolId: string) => {
    const symbol = project.symbols[symbolId];
    if (symbol) {
      result[symbol.fullId] = symbol;
    }
  })

  return result;
}

export const getCardboard = (cardboardId: string, project: IProject): ICardboard|undefined => {
  return project.cardboards[cardboardId];
}

export const getCard = (cardboardId: string, cardId: string, project: IProject): ICard|undefined => {
  const cardboard = getCardboard(cardboardId, project);
  if (!cardboard) {
    return undefined;
  }

  return cardboard.cards[cardId];
}

export const getIconForSymbol = (symbolType: SymbolType) => {
  return appConfig.SymbolIcons[symbolType] || appConfig.SymbolIcons.default;
}

export const colorToRgbString = (color: NColor): string => {
  
  while (color.length < 3) {
    color = [...color, 0];
  }

  while (color.length < 4) {
    color = [...color, 255];
  }

  color = color.slice(0, 3);
  
  return `rgb(${color.join(',')})`;
}
export const colorToRgbaString = (color: NColor): string => {
  
  while (color.length < 3) {
    color = [...color, 0];
  }

  while (color.length < 4) {
    color = [...color, 255];
  }

  color = color.slice(0, 4);
  return `rgba(${color.join(',')})`;
}
