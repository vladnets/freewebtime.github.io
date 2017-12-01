import { createReference, getSubitemsIds } from '../helpers';
import { IHash } from '../api/IHash';
import { IProject } from '../api/project/IProject';
import { ICardboard } from '../api/project/ICardboard';
import { ISymbol } from '../api/project/ISymbol';
import { ICard } from '../api/project/ICard';
import { getSubitems } from '../helpers/index';

const createCards = (symbol: ISymbol, project: IProject): IHash<ICard> => {
  const cards: IHash<ICard> = {}
  const subitems = getSubitems(symbol.fullId, project);

  if (subitems) {
    Object.keys(subitems).map((symbolId: string) => {
      const symbol: ISymbol = subitems[symbolId];
      const card: ICard = {
        id: symbolId,
        name: symbol.name,
        position: {x: 100, y: 200},
        size: {x: 160, y: 70},
      }      

      cards[symbolId] = card;
    })
  }

  return cards;
}

const createCardboard = (symbol:ISymbol, project: IProject): ICardboard => {
  const cards: IHash<ICard> = createCards(symbol, project);
  
  const cardboard: ICardboard = {
    id: symbol.fullId,
    name: symbol.name,
    cards: cards,
    rootSymbolRef: createReference(symbol),
  }

  return cardboard;
}

export const createCardboards = (project: IProject): IHash<ICardboard> => {
  
  const symbols = project.symbols;
  const cardboards: IHash<ICardboard> = {};

  Object.keys(symbols).map((symbolId: string) => {
    const symbol = symbols[symbolId];
    const cardboard = createCardboard(symbol, project);
    cardboards[symbolId] = cardboard;
  })

  return cardboards;
}