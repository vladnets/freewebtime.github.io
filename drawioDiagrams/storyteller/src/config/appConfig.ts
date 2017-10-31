import { IVector2 } from '../api/IVector2';
import { ICallback } from '../api/index';
import { IAction } from '../api/IAction';
import Typography from 'material-ui/Typography';
import { INode } from '../api/INode';
import { IFunction } from '../api/project/IFunction';

export const appConfig = {
  IsSaveStateToLocalStorage: true,
  IsLoadStateFromLocalStorage: true,
  SaveStateToLocalStorageInterval: 1000,

  SystemTypeNames: {
    TYPE_STRING: 'System.String',
    TYPE_NUMBER: 'System.Number',
    TYPE_BOOLEAN: 'System.Boolean',

    TYPE_CONSTRUCTOR_STRING: 'Text',
    TYPE_CONSTRUCTOR_NUMBER: 'Number',
    TYPE_CONSTRUCTOR_BOOLEAN: 'Bool',
  },

  Actions: {
    Types: {
      NO_OPERATION: 'NO_OPERATION',
      
      NODE_CREATE_NEW: 'NODE_CREATE_NEW',
      NODE_REMOVE: 'NODE_REMOVE',
      NODE_UPDATE: 'NODE_UPDATE',

      TYPE_CREATE: 'TYPE_CREATE',
      TYPE_REMOVE: 'TYPE_REMOVE',
      TYPE_UPDATE: 'TYPE_UPDATE',
      TYPES_CREATE_SYSTEM: 'TYPES_CREATE_SYSTEM',

      FUNCTION_CREATE: 'FUNCTION_CREATE',
      FUNCTION_REMOVE: 'FUNCTION_REMOVE',
      FUNCTION_UPDATE: 'FUNCTION_UPDATE',
      FUNCTIONS_CREATE_SYSTEM: 'FUNCTIONS_CREATE_SYSTEM',

      MODULE_ADD: 'MODULE_ADD',
      MODULE_REMOVE: 'MODULE_REMOVE',
      MODULE_UPDATE: 'MODULE_UPDATE',
      MODULE_CREATE: 'MODULE_CREATE',
      MODULES_CREATE_SYSTEM: 'MODULES_CREATE_SYSTEM',

      PROJECT_SELECT_MODULE: 'PROJECT_SELECT_MODULE',

      APP_SET_CALLBACK: 'APP_SET_CALLBACK',
    },

    NoOperation: (): IAction => {
      return {type: appConfig.Actions.Types.NO_OPERATION};
    },

    SetCallback: (callback: ICallback): IAction => {
      return {type: appConfig.Actions.Types.APP_SET_CALLBACK, payload: callback}
    },

    NodeCreateNew: (data: {}, moduleId: string): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_CREATE_NEW,
        payload: {data: data, moduleId: moduleId}
      };
    },
    NodeRemove: (nodeId: string, moduleId: string): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_CREATE_NEW,
        payload: {nodeId: nodeId, moduleId: moduleId}
      };
    },
    NodeUpdate: (updatedNode: INode, moduleId: string): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_UPDATE,
        payload: {node: updatedNode, moduleId: moduleId},
      }
    },

    FunctionCreateNew: (newFunction: IFunction): IAction => {
      return {
        type: appConfig.Actions.Types.FUNCTION_CREATE,
        payload: newFunction
      };
    },
    FunctionRemove: (functionId: string): IAction => {
      return {
        type: appConfig.Actions.Types.FUNCTION_REMOVE,
        payload: functionId
      };
    },
    FunctionUpdate: (updatedFunction: IFunction): IAction => {
      return {
        type: appConfig.Actions.Types.FUNCTION_UPDATE,
        payload: updatedFunction,
      }
    },
    FunctionsCreateSystem: (): IAction => {
      return {
        type: appConfig.Actions.Types.FUNCTIONS_CREATE_SYSTEM
      }
    },

    ProjectSelectModule: (moduleId: string): IAction => {
      return {
        type: appConfig.Actions.Types.PROJECT_SELECT_MODULE,
        payload: moduleId
      }
    }

  },
  SystemFunctions: {
    ['System.String'] : (args) => {
      if (args[('value')]) {
        return args[('value')];
      }
    },
    'System.Boolean': (args) => {
      if (args[('value')]) {
        return args[('value')];
      }
    },
    'System.Number': (args) => {
      if (args[('value')]) {
        return args[('value')];
      }
    },
  }
}

