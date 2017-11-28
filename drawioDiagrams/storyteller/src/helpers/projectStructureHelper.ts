import { ISymbol } from '../api/project/ISymbol';
import { IProjectStructureItem } from '../api/project/IProjectStructureItem';
import { IProject } from '../api/project/IProject';
import { IHash } from '../api/IHash';

export const parseProjectStructure = (symbols: IHash<ISymbol>, projectId: string): IHash<IProjectStructureItem> => {
  const result = {}
  const rootSymbol = symbols[projectId];
  
  if (rootSymbol) {
    const rootItem: IProjectStructureItem = {
      id: rootSymbol.fullId,
      name: rootSymbol.name,
      subitems: {},
    }

    result[rootItem.id] = rootItem;
  }
  
  return result;
}

export const getStructureRoot = (structure: IHash<IProjectStructureItem>, projectId: string) => {
  return structure[projectId];
}

export const getStructureItem = (structureItemId: string, project: IProject) => {
  return project.structure[structureItemId];
}