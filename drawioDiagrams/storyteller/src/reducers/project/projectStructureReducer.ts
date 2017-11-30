import { IProjectStructure } from '../../api/project/IProjectStructure';
import { IHash } from '../../api/IHash';
import { IProjectStructureItem } from '../../api/project/IProjectStructureItem';
import { IAction } from '../../api/IAction';
import { initialStructure } from '../../config/initialState';

export const projectStructureReducer = (state: IProjectStructure = initialStructure, action: IAction) => {
  return state;
}