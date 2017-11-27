import { IAction } from '../../api/IAction';
import { ISymbol } from '../../api/project/ISymbol';
import { IHash } from '../../api/IHash';
import { initialSymbols } from '../../config/initialState';

export const symbolsReducer = (state: IHash<ISymbol> = initialSymbols, action: IAction) => {
  return state;
}