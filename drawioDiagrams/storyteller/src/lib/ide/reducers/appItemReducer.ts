import { IAppItem } from '../../framework/appData/IAppItem';
import { IApp } from '../appData/IApp';
import * as ActionTypes from '../actions/actionTypes';
import { CreateGuid } from '../../framework/utils';
import ItemTypes from '../appData/ItemTypes';

export default function (state: IAppItem, action: { type: string, payload?: any }): IAppItem {
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
        Name: 'Initial application',
        Content: {}
    };
}