import { IUniqueObject } from '../IUniqueObject';
import { IHash } from '../IHash';

export enum ProjectItemType {
  Module,
  Folder,
  Card,
}

export interface IProjectItem extends IUniqueObject {
  projectItemType: ProjectItemType;
  subitems: IHash<IProjectItem>;  
}