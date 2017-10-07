import { IApp } from '../IApp';
import { CreateGuid } from '../../../framework/utils';
import ItemTypes from '../../appData/ItemTypes';

const storyEdtorApp: IApp = {
  Id: CreateGuid(),
  IsRequired: true,
  Name: 'Fwt Story Editor',
  ItemType: ItemTypes.ITEM_TYPE_APP,
  Content: {
    Project: {
      Id: CreateGuid(),
      IsRequired: true,
      Name: 'Blank project',
      ItemType: ItemTypes.ITEM_TYPE_PROJECT,
    }
  }
}

export default storyEdtorApp;