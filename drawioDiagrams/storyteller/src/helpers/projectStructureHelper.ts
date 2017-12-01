import { parsePath, pathToString } from './';
import { ISymbol } from '../api/project/ISymbol';
import { IProjectStructureItem } from '../api/project/IProjectStructureItem';
import { IProject } from '../api/project/IProject';
import { IHash } from '../api/IHash';
import { IProjectStructure } from '../api/project/IProjectStructure';

const getOrCreateNamespaceItem = (namespace: string, projectStructure: IHash<IProjectStructureItem>, symbols: IHash<ISymbol>, rootItems: any): IProjectStructureItem => {
  let itemId = '';
  let itemName = '';
  let itemFullId = namespace;
  let itemNamespace: string|undefined = undefined;
  let itemLevel = 0;
  const symbol = symbols[namespace];
  const path = parsePath(namespace);
  if (path) {
    itemLevel = path.length-1;
  }
  
  if (symbol) {
    itemId = symbol.id;
    itemName = symbol.name;
    itemNamespace = symbol.namespace;
  }
  else {
    if (path && path.length > 0) {
      const ownNamespacePath = path.slice(0, path.length-2);
      itemId = path[path.length-1].toString();
      itemName = itemId;
      itemNamespace = ownNamespacePath.length > 0 ? pathToString(path) : undefined;
    }
  }

  let namespaceItem = projectStructure[namespace];
  if (namespaceItem) {
    return namespaceItem;
  }

  namespaceItem = {
    id: itemId,
    name: itemName,
    fullId: itemFullId,
    namespace: itemNamespace,
    subitems: {},
    level: itemLevel,
  };
  projectStructure[itemFullId] = namespaceItem;
  if (namespaceItem.level === 0) {
    rootItems[namespaceItem.fullId] = namespaceItem.fullId;
  }

  return namespaceItem;
}
  
export const parseProjectStructure = (symbols: IHash<ISymbol>, projectId: string): IProjectStructure => {
  const structureItems: IHash<IProjectStructureItem> = {}
  const rootItems: IHash<string> = {}
  
  Object.keys(symbols).map((symbolId: string) => {
    const symbol = symbols[symbolId];

    let structureItem: IProjectStructureItem = structureItems[symbolId];
    if (!structureItem) {
      structureItem = 
      {
        id: symbol.id,
        name: symbol.name,
        fullId: symbol.fullId,
        namespace: symbol.namespace,
        level: 0,
        subitems: {},
      }
      if (projectId === symbol.fullId) {
        structureItem.isProjectRoot = true;
      }
      structureItems[symbolId] = structureItem;
    }
    
    structureItem.name = symbol.name;
    
    const namespace = symbol.namespace;
    if (namespace) {
      const parentStructureItem = structureItems[namespace];
      const namespaceItem = getOrCreateNamespaceItem(namespace, structureItems, symbols, rootItems);
      namespaceItem.subitems[symbol.fullId] = symbolId;
      structureItem.level = namespaceItem.level + 1;
    }

    if (structureItem.level === 0) {
      rootItems[structureItem.fullId] = structureItem.fullId;
    }
  });

  const structure: IProjectStructure = {
    items: structureItems,
    rootItems: rootItems,
  }

  return structure;
}

export const getStructureRoot = (project: IProject) => {
  return getStructureItem(project.id, project);
}

export const getStructureItem = (structureItemId: string, project: IProject) => {
  return project.structure.items[structureItemId];
}