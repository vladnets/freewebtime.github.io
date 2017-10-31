import { IAction } from '../api/IAction';
import { v4 } from 'node-uuid';
import { appConfig } from '../config/appConfig';
import { IProject } from '../api/project/IProject';

const initialState: IProject = {
  id: v4(),
  name: 'Empty project',
  imports: {},
  modules: {},
}

export const projectReducer = (state: IProject = initialState, action: IAction) => {
  
  switch (action.type) {
    
    case appConfig.Actions.Types.PROJECT_SELECT_MODULE:
    {
      state = {...state, selectedModuleId: action.payload}
    }
    break;

    case appConfig.Actions.Types.MODULE_ADD:
    {
      const id = v4();
      state = {...state, [id]: {...action.payload, id: id}}
    }
    break;

    case appConfig.Actions.Types.MODULE_REMOVE:
    {
      state = {...state}
      delete state[action.payload]; 
    }
    break;

    case appConfig.Actions.Types.MODULE_UPDATE:
    {
      const id = action.payload.id;
      state = {...state, [id]: action.payload}
    }
    break;

    default:
    break;
  }
  
  return state;
}