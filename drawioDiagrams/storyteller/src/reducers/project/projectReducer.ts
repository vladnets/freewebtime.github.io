import { IProject } from '../../api/project/IProject';
import { IAction } from '../../api/IAction';
import { combineReducers } from 'redux';
import { symbolsReducer } from './symbolsReducer';
import { cardboardsReducer } from './cardboardsReducer';
import { projectStructureReducer } from './projectStructureReducer';
import { initialProject } from '../../config/initialState';
import { objectsReducer } from './objectsReducer';

export const projectReducer = (state: IProject = initialProject, action: IAction) => {
  
  const newValues: any = {}
  let isChanged = false;

  const oldSymbols = state.symbols;
  const newSymbols = symbolsReducer(oldSymbols, action);
  if (oldSymbols !== newSymbols) {
    newValues.symbols = newSymbols;
    isChanged = true;
  }

  const oldCardboards = state.cardboards;
  const newCardboards = cardboardsReducer(oldCardboards, action);
  if (oldCardboards !== newCardboards) {
    newValues.cardboards = newCardboards;
    isChanged = true;
  }

  const oldStructure = state.structure;
  const newStructure = projectStructureReducer(oldStructure, action);
  if (oldStructure !== newStructure) {
    newValues.symbols = newStructure;
    isChanged = true;
  }

  const oldObjects = state.objects;
  const newObjects = objectsReducer(oldObjects, action);
  if (oldObjects !== newObjects) {
    newValues.objects = newObjects;
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

