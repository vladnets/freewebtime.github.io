import { IApp } from '../IApp';
import { CreateGuid } from '../../../framework/utils';
import ItemTypes from '../../appData/ItemTypes';

const storyEdtorApp: IApp = {
  Id: CreateGuid(),
  IsRequired: true,
  Name: 'Fwt Story Editor',
  ItemType: ItemTypes.ITEM_TYPE_APP,
  Content: {
    Id: CreateGuid(),
    IsRequired: true,
    Name: 'Blank project',
    ItemType: ItemTypes.ITEM_TYPE_PROJECT,
    Content: [
      {
        Id: CreateGuid(),
        Name: 'subitem',
        ItemType: ItemTypes.ITEM_TYPE_STRING,
        Content: 'some text as value of string type'
      },
      {
        Id: CreateGuid(),
        Name: 'subitem 2',
        ItemType: ItemTypes.ITEM_TYPE_STRING,
        Content: 'some text as value of string type'
      },
      {
        Id: CreateGuid(),
        Name: 'subitem 3',
        ItemType: ItemTypes.ITEM_TYPE_INT,
        Content: 10
      }
    ],
  }
}

export default storyEdtorApp;