import { IProject, IProjectItem, ProjectItemType } from '../api/IAppState';
import { INode, NodeType } from '../api/INode';
import { IHash } from '../api/IHash';
import { IAction } from '../api/IAction';
import { combineReducers } from 'redux';
import { v4 } from 'node-uuid';
import { appConfig } from '../config/appConfig';
import { foreachFields } from '../helpers/index';

const importsItemId = v4();
const typesItemId = v4();
const ids = [v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4(), v4()];

const initialState: IHash<IProjectItem> = {
  [importsItemId]: {
    id: importsItemId,
    name: 'imports',
    type: ProjectItemType.Folder,
    subitems: {
      [ids[0]]: {
        id: ids[0],
        name: 'import 1',
        type: ProjectItemType.File,
        subitems: {
        }    
      },
      [ids[1]]: {
        id: ids[1],
        name: 'import 2',
        type: ProjectItemType.File,
        subitems: {
          [ids[3]]: {
            id: ids[3],
            name: 'subimport 1',
            type: ProjectItemType.File,
            subitems: {
            }    
          },
          [ids[4]]: {
            id: ids[4],
            name: 'subimport 2',
            type: ProjectItemType.File,
            subitems: {
            }    
          },
        }    
      },
      [ids[2]]: {
        id: ids[2],
        name: 'import 3',
        type: ProjectItemType.File,
        subitems: {
        }    
      },
    }    
  },
  [typesItemId]: {
    id: typesItemId,
    name: 'types',
    type: ProjectItemType.Folder,
    subitems: {
    }
  }
}

export const projectItemsReducer = function(state: IHash<IProjectItem> = initialState, action: IAction) {
  
  switch (action.type) {
    case appConfig.Actions.Types.PROJECT_ITEM_ADD:
    {
      const itemId = v4();
      state = {...state, [itemId]: {...action.payload, id: itemId}}
    }
    break;

    case appConfig.Actions.Types.PROJECT_ITEM_REMOVE:
    {
      state = {...state}
      delete state[action.payload]; 
    }
    break;

    case appConfig.Actions.Types.PROJECT_ITEM_UPDATE:
    {
      const itemId = action.payload.id;
      if (state[itemId]) {
        state = {...state, [itemId]: action.payload}
      }
      else {
        const newState: IHash<IProjectItem> = {};
        foreachFields(state, (fieldName, index, fieldValue)=> {
          newState[fieldName] = {...fieldValue, subitems: projectItemsReducer(fieldValue.subitems, action)};
        })
      }
    }
    break;

    default: break;
  }
  
  return state;
}
