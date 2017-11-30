import { IProject } from '../../api/project/IProject';
import { IAction } from '../../api/IAction';
import { combineReducers } from 'redux';
import { itemsReducer } from './itemsReducer';
import { symbolsReducer } from './symbolsReducer';
import { cardboardsReducer } from './cardboardsReducer';
import { projectStructureReducer } from './projectStructureReducer';
import { initialProject } from '../../config/initialState';
import { interfacesReducer } from './interfacesReducer';

export const projectReducer = (state: IProject = initialProject, action: IAction) => {
  
  const newValues: any = {}
  let isChanged = false;

  const oldInterfaces = state.interfaces;
  const newInterfaces = interfacesReducer(oldInterfaces, action);
  if (oldInterfaces !== newInterfaces) {
    newValues.interfaces = newInterfaces;
    isChanged = true;
  }

  const oldSymbols = state.symbols;
  const newSymbols = symbolsReducer(oldSymbols, action);
  if (oldSymbols !== newSymbols) {
    newValues.symbols = newSymbols;
    isChanged = true;
  }

  const oldItems = state.items;
  const newItems = itemsReducer(oldItems, action);
  if (oldItems !== newItems) {
    newValues.items = newItems;
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

  
  if (isChanged) {
    state = {
      ...state,
      ...newValues,
    }
  }

  return state;
}

