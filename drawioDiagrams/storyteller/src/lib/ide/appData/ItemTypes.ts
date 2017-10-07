import { ItemTypes as frameworkTypes } from '../../framework/appData/IItem';

class itemTypes extends frameworkTypes {
  ITEM_TYPE_APP: string = 'ITEM_TYPE_APP';
  ITEM_TYPE_IDE: string = 'ITEM_TYPE_IDE';
  ITEM_TYPE_PROJECT: string = 'ITEM_TYPE_PROJECT';
  ITEM_TYPE_PROJECT_ITEM: string = 'ITEM_TYPE_PROJECT_ITEM';
}

export const ItemTypes: itemTypes = new itemTypes(); 
