import { IProject } from '../api/IAppState';
import { IHash } from '../api/IHash';
import { IModule } from '../api/INode';
export const foreachFields = (obj: {}, callback: (fieldName: string, index: number, fieldValue: any)=>void) => {
  Object.keys(obj).map((key: string, index: number) => {
    console.log('before call callback', obj, key, index, obj[key]);
    callback(key, index, obj[key]);
  })
}

export const getTypeById = (id: string|undefined, module: IModule) => {
  if (!id) {
    return undefined;
  }

  return module.types[id];
}

export const getFunctionById = (id: string|undefined, module: IModule) => {
  if (!id) {
    return undefined;
  }

  return module.functions[id];
}

export const getNodeById = (id: string|undefined, module: IModule) => {
  if (!id) {
    return undefined;
  }
  
  return module.nodes[id];
}

export const getModuleById = (id: string|undefined, project: IProject) => {
  if (!id) {
    return undefined;
  }
  
  return project.modules[id];
}
