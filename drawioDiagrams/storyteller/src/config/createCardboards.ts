import { getSubitemsIds } from '../helpers';
import { IHash } from '../api/IHash';
import { IProject } from '../api/project/IProject';
import { ICardboard } from '../api/project/ICardboard';
import { ISymbol } from '../api/project/ISymbol';
import { ICard } from '../api/project/ICard';
import { getSubitems } from '../helpers/index';
import { IProjectStructure } from '../api/project/IProjectStructure';
import { IProjectStructureItem } from '../api/project/IProjectStructureItem';

const createCards = (structureItem: IProjectStructureItem, project: IProject): IHash<ICard> => {
  const cards: IHash<ICard> = {}
  const subitems = getSubitems(structureItem.fullId, project);

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

const createCardboard = (structureItem:IProjectStructureItem, project: IProject): ICardboard => {
  const cards: IHash<ICard> = createCards(structureItem, project);
  
  const cardboard: ICardboard = {
    id: structureItem.fullId,
    name: structureItem.name,
    cards: cards,
    namespace: structureItem.fullId,
  }

  return cardboard;
}

export const createCardboards = (project: IProject): IHash<ICardboard> => {
  
  const structureItems = project.structure.items;
  const cardboards: IHash<ICardboard> = {};

  Object.keys(structureItems).map((symbolId: string) => {
    const structureItem = structureItems[symbolId];
    const cardboard = createCardboard(structureItem, project);
    cardboards[symbolId] = cardboard;
  })

  return cardboards;
}