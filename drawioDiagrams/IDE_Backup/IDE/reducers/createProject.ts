import { IAppState } from '../state/IAppState';
import * as ActionTypes from '../actions/actionTypes'
// import { NavbarItemTypes } from '../state/NavbarItemTypes';
import {} from '../project/templates'


export default function (state: IAppState, action: { type: string, projectType: string, projectName: string }) {
    switch (action.type) {
        
        case ActionTypes.PROJECT_CREATE:
            return {
                ...state,
                IdeState: {
                    ...state.IdeState,
                    Project: 
                }
            }

        default:
            return {...state}
    }
}