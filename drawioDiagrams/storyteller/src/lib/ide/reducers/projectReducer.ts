import * as ActionTypes from '../actions/actionTypes';

export default function (state: any, action: { type: string }) {
    switch (action.type) {
        
        case ActionTypes.PROJECT_CREATE:
            return {
                ...state,
                Project: {},
                Name: 'ProjType'
            }

        default:
            return {...state}
    }
}