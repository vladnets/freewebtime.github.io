import { IProjectItem } from '../api/IAppState';
import { IVector2 } from '../api/IVector2';
import { ICallback } from '../api/index';
import { IAction } from '../api/IAction';
import { INode } from '../api/INode';
import Typography from 'material-ui/Typography';
export const appConfig = {
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
      NODE_MOVE: 'NODE_MOVE',
      NODE_RESIZE: 'NODE_RESIZE',

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
