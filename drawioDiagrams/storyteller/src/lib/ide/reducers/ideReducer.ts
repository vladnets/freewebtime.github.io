import { IAppItem } from '../../framework/appData/IAppItem';
import { IApp } from '../appData/IApp';
import * as ActionTypes from '../actions/actionTypes';
import { CreateGuid } from '../../framework/utils';
import ItemTypes from '../appData/ItemTypes';
import appItemReducer from './appItemReducer';
import Actions from '../actions';

const appReducer = (state: IApp, action: {type: string, payload?: any}): IApp => {
    switch (action.type) {
        case ActionTypes.APP_ITEM_ADD:
        const newItem: IAppItem = action.payload;
        if (newItem) {
            return {
                ...state,
                Content: {...state.Content, newItem}
            }
        }
        break;
    
    default:
        break;
    }
    
    return state || {
        Id: CreateGuid(),
        ItemType: ItemTypes.ITEM_TYPE_APP,
        Name: 'Initial app',
        IsRequired: true,
        Content: 'content app'
    }
}

export default appReducer;