import { IPayloadCreateProject } from '../actions/payloads/IPayloadCreateProject';
import { IProject } from '../appData/IProject';
import * as ActionTypes from '../actions/actionTypes';
import { combineReducers } from 'redux';
import ideReducer from './ideReducer';
import ItemsReducer from './projectItemsReducer';

const projectNameReducer = (state: string): string => {
    return state || 'Awesome project';
}

export const projectReducer = combineReducers({
    Name: projectNameReducer,
    Items: ItemsReducer,
});

// function old(state: IProject, action: { type: string, payload: any }) {
//     switch (action.type) {
        
//         case ActionTypes.PROJECT_CREATE:
//             const payload = action.payload as IPayloadCreateProject;
//             if (payload)
//             {
//                 const template = payload.templates[payload.templateName];
//                 if (template)
//                 {
//                     return {
//                         ...template,
//                         Name: payload.name,
//                     }
//                 }
//             }
//             return { ...state };

//         case ActionTypes.PROJECT_CHANGE_NAME:
//             return {
//                 ...state,
//                 Name: action.payload
//             }

//         default:
//             return {...state}
//     }
// }
