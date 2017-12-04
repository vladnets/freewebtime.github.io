import { IProject } from '../../api/project/IProject';
import { IAction } from '../../api/IAction';
import { cardsReducer } from './cardsReducer';
import { initialProject } from '../../config/intialState';
import { cardboardsReducer } from './carboardsReducer';

export const projectReducer = (state: IProject = initialProject, action: IAction) => {
  
  const newValues: any = {}
  let isChanged = false;

  const oldCards = state.cards;
  const newCards = cardsReducer(oldCards, action);
  if (oldCards !== newCards) {
    newValues.cards = newCards;
    isChanged = true;
  }

  const oldCardboards = state.cardboards;
  const newCardboards = cardboardsReducer(oldCardboards, action);
  if (oldCardboards !== newCardboards) {
    newValues.cardboards = newCardboards;
    isChanged = true;
  }

  if (isChanged) {
    state = {
      ...state,
      ...newValues,
    }
  }

  return state;
}

