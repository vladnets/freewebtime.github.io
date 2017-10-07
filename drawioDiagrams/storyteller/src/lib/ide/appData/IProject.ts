import { IProjectItem } from './IProjectItem';
import { IViewData } from '../../framework/view/IViewData';

export interface IProject {
  Name: string,
  Items: IProjectItem[]
}