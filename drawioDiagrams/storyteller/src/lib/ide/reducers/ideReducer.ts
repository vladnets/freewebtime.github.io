import { IAppState } from '../appState/IAppState';
import * as ActionTypes from '../actions/actionTypes';
import ProjectReducer from './projectReducer';

export default function (state: IAppState, action: { type: string }) {
    switch (action.type) {
        case ActionTypes.IDE_INITIALIZE:
            return {
                ...state, 
                StatusText: 'ide initialized!!!',
            }
        
        case ActionTypes.PROJECT_CREATE:
            return ProjectReducer(state, action);

        default:
            return {...state}
    }
}