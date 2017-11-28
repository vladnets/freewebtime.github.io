import { ICallback } from '../api/index';
import { IAction } from '../api/IAction';
import { ICardboard } from '../api/project/ICardboard';
import { ICard } from '../api/project/ICard';
export const appConfig = {
  IsSaveStateToLocalStorage: true,
  IsLoadStateFromLocalStorage: false,
  SaveStateToLocalStorageInterval: 1000,

  Actions: {
    Types: {
      APP_SET_CALLBACK: 'APP_SET_CALLBACK',

      CARDBOARD_ADD: 'CARDBOARD_ADD',
      CARDBOARD_DELETE: 'CARDBOARD_DELETE',
      CARDBOARD_UPDATE: 'CARDBOARD_UPDATE',

      CARD_ADD: 'CARD_ADD',
      CARD_DELETE: 'CARD_DELETE',
      CARD_UPDATE: 'CARD_UPDATE',
    },

    SetCallback: (callback: ICallback): IAction => {
      return {
        type: appConfig.Actions.Types.APP_SET_CALLBACK,
        payload: callback,
      }
    },


    CardboardAdd: (newCardboard: ICardboard): IAction => {
      return {
        type: appConfig.Actions.Types.CARDBOARD_ADD,
        payload: newCardboard,
      }
    },
    CardboardDelete: (cardboardId: string): IAction => {
      return {
        type: appConfig.Actions.Types.CARDBOARD_DELETE,
        payload: cardboardId,
      }
    },
    CardboardUpdate: (cardboardId: string, values: {}): IAction => {
      return {
        type: appConfig.Actions.Types.CARDBOARD_UPDATE,
        payload: {cardboardId, values},
      }
    },

    CardAdd: (cardboardId: string, newCard: ICard): IAction => {
      return {
        type: appConfig.Actions.Types.CARD_ADD,
        payload: {cardboardId, newCard},
      }
    },
    CardDelete: (cardboardId: string, cardId: string): IAction => {
      return {
        type: appConfig.Actions.Types.CARD_DELETE,
        payload: {cardboardId, cardId},
      }
    },
    CardUpdate: (cardboardId: string, cardId: string, values: {}): IAction => {
      return {
        type: appConfig.Actions.Types.CARD_UPDATE,
        payload: {cardboardId, cardId, values},
      }
    },

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

