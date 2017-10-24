import { IProjectItem } from '../api/IAppState';
import { IVector2 } from '../api/IVector2';
import { ICallback } from '../api/index';
import { IAction } from '../api/IAction';
import { INode, IType } from '../api/INode';
import Typography from 'material-ui/Typography';
export const appConfig = {
  IsSaveStateToLocalStorage: true,
  IsLoadStateFromLocalStorage: false,
  SaveStateToLocalStorageInterval: 1000,

  SystemTypeNames: {
    TYPE_STRING: 'System.String',
    TYPE_NUMBER: 'System.Number',
    TYPE_BOOLEAN: 'System.Boolean',

    TYPE_CONSTRUCTOR_STRING: 'TYPE_CONSTRUCTOR_STRING',
    TYPE_CONSTRUCTOR_NUMBER: 'TYPE_CONSTRUCTOR_NUMBER',
    TYPE_CONSTRUCTOR_BOOLEAN: 'TYPE_CONSTRUCTOR_BOOLEAN',
  },

  NodeTypes: {
    NODE_TYPE_STRING: 'NODE_TYPE_STRING',
    NODE_TYPE_NUMBER: 'NODE_TYPE_NUMBER',
    NODE_TYPE_IMAGE: 'NODE_TYPE_IMAGE',
    NODE_TYPE_BOOL: 'NODE_TYPE_BOOL',
    NODE_TYPE_ICON: 'NODE_TYPE_ICON',
    NODE_TYPE_OBJECT: 'NODE_TYPE_OBJECT',
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

      FUNCTION_CREATE: 'FUNCTION_CREATE',
      FUNCTION_REMOVE: 'FUNCTION_REMOVE',
      FUNCTION_UPDATE: 'FUNCTION_UPDATE',

      PROJECT_ITEM_ADD: 'PROJECT_ITEM_ADD',
      PROJECT_ITEM_REMOVE: 'PROJECT_ITEM_REMOVE',
      PROJECT_ITEM_UPDATE: 'PROJECT_ITEM_UPDATE',

      APP_SET_CALLBACK: 'APP_SET_CALLBACK',
    },

    NoOperation: (): IAction => {
      return {type: appConfig.Actions.Types.NO_OPERATION};
    },

    SetCallback: (callback: ICallback): IAction => {
      return {type: appConfig.Actions.Types.APP_SET_CALLBACK, payload: callback}
    },

    NodeCreateNew: (newNode: INode): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_CREATE_NEW,
        payload: newNode
      };
    },
    NodeRemove: (nodeId: string): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_CREATE_NEW,
        payload: nodeId
      };
    },
    NodeUpdate: (updatedNode: INode): IAction => {
      return {
        type: appConfig.Actions.Types.NODE_UPDATE,
        payload: updatedNode,
      }
    },

    TypeCreateNew: (newType: IType): IAction => {
      return {
        type: appConfig.Actions.Types.TYPE_CREATE,
        payload: newType
      };
    },
    TypeRemove: (typeId: string): IAction => {
      return {
        type: appConfig.Actions.Types.TYPE_REMOVE,
        payload: typeId
      };
    },
    TypeUpdate: (updatedType: IType): IAction => {
      return {
        type: appConfig.Actions.Types.TYPE_UPDATE,
        payload: updatedType,
      }
    },


    ProjectItemAdd: (newItem: IProjectItem): IAction => {
      return {
        type: appConfig.Actions.Types.PROJECT_ITEM_ADD,
        payload: newItem,
      }
    },
    ProjectItemRemove: (itemId: string): IAction => {
      return {
        type: appConfig.Actions.Types.PROJECT_ITEM_ADD,
        payload: itemId,
      }
    },
    ProjectItemUpdate: (updatedItem: IProjectItem): IAction => {
      return {
        type: appConfig.Actions.Types.PROJECT_ITEM_ADD,
        payload: updatedItem,
      }
    },

  }
}

