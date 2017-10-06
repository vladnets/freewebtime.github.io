import { createAction } from 'redux-actions';
import { assign } from 'lodash';
import * as ActionTypes from './actionTypes';
import { IProject } from '../appState/IProject';

export const projectCreate = createAction<IProject, string>(
  ActionTypes.PROJECT_CREATE,
  (projectName: string) => (<IProject> {Name: projectName, Created: new Date()})
);

export const projectLoad = createAction<IProject, IProject>(
  ActionTypes.PROJECT_LOAD,
  (project: IProject) => (project)
);

export const projectUnload = createAction<void>(
  ActionTypes.PROJECT_UNLOAD,
  () => { 
    // none 
  }
);

export const projectChangeName = createAction<IProject, IProject, string>(
  ActionTypes.PROJECT_EDIT_NAME,
  (proj: IProject, newName: string) => <IProject> assign(proj, { Name: newName })
);

export const noOperation = createAction<void>(
  ActionTypes.NO_OPERATION,
  () => { 
    // none
  }
)
