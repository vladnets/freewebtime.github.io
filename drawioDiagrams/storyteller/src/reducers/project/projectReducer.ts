import { IProject } from '../../api/project/IProject';
import { IAction } from '../../api/IAction';
import { combineReducers } from 'redux';
import { cardsReducer } from './cardsReducer';
import { initialProject } from '../../config/intialState';

export const projectReducer = (state: IProject = initialProject, action: IAction) => {
  
  const newValues: any = {}
  let isChanged = false;

  const oldCards = state.cards;
  const newCards = cardsReducer(oldCards, action);
  if (oldCards !== newCards) {
    newValues.cards = newCards;
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

