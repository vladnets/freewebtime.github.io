import { ICallback } from '../api/index';
import { IAction } from '../api/IAction';
export const appConfig = {
  IsSaveStateToLocalStorage: true,
  IsLoadStateFromLocalStorage: false,
  SaveStateToLocalStorageInterval: 1000,

  Actions: {
    Types: {
      APP_SET_CALLBACK: 'APP_SET_CALLBACK',
    },

    SetCallback: (callback: ICallback): IAction => {
      return {
        type: appConfig.Actions.Types.APP_SET_CALLBACK,
        payload: callback,
      }
    }
  },

  PrimitiveTypes: {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
  },
  InitialStateConfig: {
    ProjectName: 'New Project',
    ProjectId: 'New Project',
    ProjectRootName: 'New Project',
    SystemNamespace: 'System',
  },

  SystemFunctionNames: {
    Concat_String: 'Concat_String',
  },

  SystemFunctions: {
    Concat_String: (Prefix: string, Separator: string, Postfix: string): string => {
      return `${Prefix}${Separator}${Postfix}`;
    }
  }
}

