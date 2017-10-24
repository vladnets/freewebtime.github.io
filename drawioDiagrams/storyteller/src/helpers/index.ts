import { IProject } from '../api/IAppState';
export const foreachFields = (obj: {}, callback: (fieldName: string, index: number, fieldValue: any)=>void) => {
  Object.keys(obj).map((key: string, index: number) => {
    console.log('before call callback', obj, key, index, obj[key]);
    callback(key, index, obj[key]);
  })
}

export const getTypeById = (id: string|undefined, project: IProject) => {
  if (!id) {
    return undefined;
  }

  return project.types[id];
}

export const getFunctionById = (id: string|undefined, project: IProject) => {
  if (!id) {
    return undefined;
  }

  return project.functions[id];
}

export const getNodeById = (id: string|undefined, project: IProject) => {
  if (!id) {
    return undefined;
  }
  
  return project.nodes[id];
}