import { IAppState } from '../state/IAppState';
import * as ActionTypes from '../actions/actionTypes'

export default function (state: IAppState = {}, action: { type: string }) {
    switch (action.type) {
        case 'INCREMENT':
            return {...state, StatusText: 'incremented'}

        case 'DECREMENT':
            return {...state, StatusText: 'decremented'}
        
        case ActionTypes.IDE_INITIALIZE:
            return {...state, StatusText: 'ide initialized!!!'}
        
        default:
            return state
    }
}