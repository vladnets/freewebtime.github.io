import { IAction } from '../api/IAction';
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
      
      PROJECT_CREATE_EMPTY: 'PROJECT_CREATE_EMPTY',
      NODE_CREATE_NEW_VALUE: 'NODE_CREATE_NEW_VALUE',
      NODE_CREATE_NEW_CONTENT: 'NODE_CREATE_NEW_CONTENT',
      NODE_CREATE_NEW_INPUT: 'NODE_CREATE_NEW_INPUT',
    },

    CreateEmptyProject: function(): IAction {
      return <IAction> {type: appConfig.Actions.Types.PROJECT_CREATE_EMPTY};
    },

    NoOperation: () => {
      return <IAction> {type: appConfig.Actions.Types.NO_OPERATION};
    }

  }
}

