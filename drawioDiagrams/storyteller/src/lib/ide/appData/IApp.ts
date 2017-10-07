import { IIde } from './IIde';
import { IViewData } from '../../framework/view/IViewData';
import { IItem } from '../../framework/appData/IItem';

export interface IApp extends IItem {
  Ide: IIde;  
}