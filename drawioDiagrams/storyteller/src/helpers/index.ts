import { IProject } from '../api/IAppState';
import { IHash } from '../api/IHash';
import { IFunctionCall, IModule, IReference, IType, IFunction } from '../api/INode';
import { appConfig } from '../config/appConfig';
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

export const getTypeByReference = (reference: IReference, module: IModule, project: IProject): IType|undefined => {
  if (!reference) {
    return undefined;
  }
  
  if (reference.moduleId) {
    module = project.modules[reference.moduleId] || module;
  }

  return module.types[reference.referenceId];
}

export const getFunctionOfFunctionCall = (call: IFunctionCall, module: IModule, project: IProject) => {

  if (call && call.reference) {
    return getTypeByReference(call.reference, module, project)
  }

  return undefined;
}

export const getFunctionById = (id: string|undefined, module: IModule) => {
  if (!id) {
    return undefined;
  }

  return module.functions[id] || appConfig.SystemFunctions[id];
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

