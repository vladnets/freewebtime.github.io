import { IUniqueObject } from '../IUniqueObject';
import { IVector2, IVector4 } from '../IVector2';
import { IHash } from '../IHash';
import { IGenericAction } from '../IAction';

export interface ICardboardItem extends IUniqueObject {
  objectId: string;
  isCollapsed: false;
  position?: IVector2;
  expandedSize?: IVector2;
  collapsedSize?: IVector2;
  inputSocketRect?: IVector4;
  outputSocketRect?: IVector4;
}

export interface ICardboard {
  id: string;
  rootId: string;
  items: IHash<ICardboardItem>;
  clientRect?: IVector4;
}

export interface ICardboardAction extends IGenericAction<{cardboardId: string}> {
  
}
