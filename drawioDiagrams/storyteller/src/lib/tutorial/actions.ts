import { createAction } from 'redux-actions';
import { assign } from 'lodash';
import * as ActionTypes from './actionTypes';
import * as AppState from './IAppState';

export const projectCreate = createAction<AppState.IProject, string>(
  ActionTypes.PROJECT_LOAD,
  (projectName: string) => (<AppState.IProject> {Name: projectName, Created: new Date()})
);

export const projectLoad = createAction<AppState.IProject, AppState.IProject>(
  ActionTypes.PROJECT_LOAD,
  (project: AppState.IProject) => (project)
);

export const projectUnload = createAction<void>(
  ActionTypes.PROJECT_UNLOAD,
  () => { 
    // none 
  }
);

export const projectChangeName = createAction<AppState.IProject, AppState.IProject, string>(
  ActionTypes.PROJECT_EDIT_NAME,
  (proj: AppState.IProject, newName: string) => <AppState.IProject> assign(proj, { Name: newName })
);

export const noOperation = createAction<void>(
  ActionTypes.NO_OPERATION,
  () => { 
    // none
  }
)
