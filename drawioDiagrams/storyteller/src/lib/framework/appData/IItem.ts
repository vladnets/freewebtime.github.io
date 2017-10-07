export interface IItem {
  Id: string,
  ItemType?: string;
  Content?: any,
}

export class ItemTypes {
  ITEM_TYPE_STRING: string =  'ITEM_TYPE_STRING';
  ITEM_TYPE_TEXT: string =  'ITEM_TYPE_TEXT';
  ITEM_TYPE_BOOL: string =  'ITEM_TYPE_BOOL';
  ITEM_TYPE_ITEM_TYPE_REF: string =  'ITEM_TYPE_ITEM_TYPE_REF';
  ITEM_TYPE_ITEM_REF: string =  'ITEM_TYPE_ITEM_REF';
  ITEM_TYPE_ITEMS_GROUP: string =  'ITEM_TYPE_ITEMS_GROUP';
}