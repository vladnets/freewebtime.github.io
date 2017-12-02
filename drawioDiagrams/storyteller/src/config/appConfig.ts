import { ICallback } from '../api/index';
import { IAction } from '../api/IAction';
import { NColor } from '../api/Color';
import { ICard, CardType } from '../api/project/ICard';
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

  Colors: {
    Black: <NColor> [0, 0, 0, 255],
    White: <NColor> [255, 255, 255, 255],
    Transparent: <NColor> [0, 0, 0, 0],
    Red: <NColor> [255, 0, 0, 255],
    Green: <NColor> [0, 255, 0, 255],
    Blue: <NColor> [0, 0, 255, 255],
    Yellow: <NColor> [255, 230, 0, 255],
  },

  CardIcons: {
    [CardType.Function]: 'wrench',
    [CardType.Primitive]: 'wrench',
    [CardType.Structure]: 'wrench',
    ['default']: 'wrench',
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

