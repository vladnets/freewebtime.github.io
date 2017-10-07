import { IProject } from '../appData/IProject';
import * as ActionTypes from '../actions/actionTypes';

export default function (state: IProject, action: { type: string, payload: any }) {
    switch (action.type) {
        
        case ActionTypes.PROJECT_CHANGE_NAME:
            return {
                ...state,
                Name: action.payload
            }

        default:
            return {...state}
    }
}