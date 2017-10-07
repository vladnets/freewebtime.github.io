import { IViewData } from '../../framework/view/IViewData';
import { IProject } from './IProject';
import { IItem } from '../../framework/appData/IItem';

export interface IIde extends IItem {
  InstanceId?: string,
  Project?: IProject
}