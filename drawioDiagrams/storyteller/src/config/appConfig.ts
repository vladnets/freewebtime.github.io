import { IAction } from '../api/actions/IAction';
import { INode } from '../api/project/INode';
import { IAppData } from '../api/IAppData';
import { NodeType } from '../api/project/NodeType';

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
      PROJECT_CREATE_EMPTY: 'PROJECT_CREATE_EMPTY',
      NODE_CREATE_NEW_VALUE: 'NODE_CREATE_NEW_VALUE',
      NODE_CREATE_NEW_CONTENT: 'NODE_CREATE_NEW_CONTENT',
      NODE_CREATE_NEW_INPUT: 'NODE_CREATE_NEW_INPUT',
    },
    CreateEmptyProject: function(): IAction {
      return <IAction> {type: appConfig.Actions.Types.PROJECT_CREATE_EMPTY};
    },
    AddValueNode: function(newNode: INode, context?: IAppData): IAction {
      return <IAction> {
        type: appConfig.Actions.Types.NODE_CREATE_NEW_VALUE,
        context: context,
        payload: newNode,
      };
    },
    AddInputNode: function(newNode: INode, context?: IAppData): IAction {
      return <IAction> {
        type: appConfig.Actions.Types.NODE_CREATE_NEW_INPUT,
        context: context,
        payload: newNode,
      };
    },
    AddContentNode: function(newNode: INode, context?: IAppData): IAction {
      return <IAction> {
        type: appConfig.Actions.Types.NODE_CREATE_NEW_CONTENT,
        context: context,
        payload: newNode,
      };
    },
  }
}

