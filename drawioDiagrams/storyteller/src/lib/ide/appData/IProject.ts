import { IItem } from '../../framework/appData/IItem';
import { IProjectItem } from './IProjectItem';
import { IViewData } from '../../framework/view/IViewData';

export interface IProject extends IItem {
  Name: string,
  Items: IProjectItem[]
}