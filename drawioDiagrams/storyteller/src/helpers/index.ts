import { IHash } from '../api/IHash';
import { appConfig } from '../config/appConfig';
import { ISymbol, SymbolType } from '../api/project/ISymbol';
import { IReference, ReferenceType } from '../api/project/IReference';
import { IProject } from '../api/project/IProject';

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
