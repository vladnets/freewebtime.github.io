import { ReferencePath, ReferencePathItem } from '../api/project/ReferencePath';
import { IHash } from '../api/IHash';
import { appConfig } from '../config/appConfig';
import { ISymbol, SymbolType } from '../api/project/ISymbol';
import { IReference, ReferenceType } from '../api/project/IReference';
import { IProject } from '../api/project/IProject';
import { ICardboard } from '../api/project/ICardboard';
import { ICard } from '../api/project/ICard';
import { IInterface, InterfaceType } from '../api/project/IInterface';
import { IItem, ItemType } from '../api/project/IItem';

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

export const createReference = (symbol: ISymbol): IReference => {
  let referenceType = ReferenceType.Interface;
  if (symbol.symbolType === SymbolType.Item) {
    referenceType = ReferenceType.Item;
  }
  return {
    referenceType: referenceType,
    targetId: symbol.fullId,
  }
}

export const resolveReference = (reference: IReference|undefined, project: IProject): ISymbol|undefined => {
  if (!reference) {
    return undefined;
  }
  
  return resolveReferenceFast(reference.targetId, project);
}

export const resolveReferenceFast = (targetId: string, project: IProject): ISymbol|undefined => {
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

export const getSubitemsIds = (namespace: string, project: IProject): IHash<string>|undefined => {
  const structureItem = project.structure[namespace];
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
      result[symbol.id] = symbol;
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

export const getIconForSymbol = (symbol: ISymbol) => {
  switch (symbol.symbolType) {
    case SymbolType.Interface: {
      const intrf = symbol as IInterface;

      if (intrf) {
      
        switch (intrf.interfaceType) {
          case InterfaceType.Function: {
            
          } break;
        
          case InterfaceType.Structure: {

          } break;
        
          case InterfaceType.Primitive: {

          } break;
        
          default: break;
        }
      
      }

    } break;
  
    case SymbolType.Item: {
      const item = symbol as IItem;

      if (item) {
      
        switch (item.itemType) {
          case ItemType.FunctionCall: {

          } break;
        
          case ItemType.Object: {

          } break;
        
          case ItemType.SourceCode: {

          } break;
        
          default: break;
        }
      
      }

    } break;
  
    default: break;
  }

  return 'wrench';
}
