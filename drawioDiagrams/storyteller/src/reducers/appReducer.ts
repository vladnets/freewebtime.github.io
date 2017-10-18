import { access } from 'fs';
import { appConfig } from '../config/appConfig';
import { INode } from '../api/project/INode';
import { IAppData } from '../api/IAppData';
import { appResourcesReducer } from './appResources/appResourcesReducer';
import { IAppResources } from '../api/IAppResources';
import { IAction } from '../api/actions/IAction';
import { IViewItem } from '../api/IViewItem';
import { NodeType } from '../api/project/NodeType';
import * as Uuid from 'node-uuid';

export const appReducer = function(state: IAppData = defaultState, action: IAction) {
  return state;
}

const defaultState = <IAppData> {
  resources: appResourcesReducer(undefined, {type: ''}),
  content: {}
}
