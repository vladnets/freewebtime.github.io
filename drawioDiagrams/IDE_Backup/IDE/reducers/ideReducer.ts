import { IAppState } from '../state/IAppState';
import * as ActionTypes from '../actions/actionTypes';
// import { NavbarItemTypes } from '../state/NavbarItemTypes';
import CreateProjectReducer from './createProject';

export default function (state: IAppState, action: { type: string }) {
    switch (action.type) {
        case ActionTypes.IDE_INITIALIZE:
            return {
                ...state, 
                StatusText: 'ide initialized!!!',
            }
        
        case ActionTypes.PROJECT_CREATE:
            return CreateProjectReducer(state, action);

        default:
            return {...state}
    }
}