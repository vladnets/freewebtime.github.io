import { IUniqueObject } from '../IUniqueObject';
import { IVector2 } from '../IVector2';
import { IHash } from '../IHash';
import { IGenericAction } from '../IAction';

export interface ICardboardItem extends IUniqueObject {
  objectId: string;
  isCollapsed: false;
  position?: IVector2;
  size?: IVector2;
}

export interface ICardboard {
  id: string;
  rootId: string;
  items: IHash<ICardboardItem>;
}

export interface ICardboardAction extends IGenericAction<{cardboardId: string}> {
  
}
