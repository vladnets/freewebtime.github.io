import { IProject } from '../../api/project/IProject';
import { IAction } from '../../api/IAction';
import { cardsReducer } from './cardsReducer';
import { initialProject } from '../../config/intialState';
import { cardboardsReducer } from './carboardsReducer';

export const ProjectActions = {
  Types: {
    PROJECT_UPDATE: 'PROJECT_UPDATE',
  },

  UpdateProject: (newValues: {}): IAction => {
    return {
      type: ProjectActions.Types.PROJECT_UPDATE,
      payload: newValues,
    }
  }
}

export const projectReducer = (state: IProject = initialProject, action: IAction) => {
  
  let newValues: any = {}
  let isChanged = false;

  switch (action.type) {

    case ProjectActions.Types.PROJECT_UPDATE: {
      return {
        ...state,
        ...action.payload,
      }
    } 
  
    default: break;
  }

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

