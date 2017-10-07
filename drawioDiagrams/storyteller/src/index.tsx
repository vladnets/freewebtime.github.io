import { IProjectItem } from './lib/ide/appData/IProjectItem';
import { IAction } from './lib/framework/actions/IAction';
import { IViewData } from './lib/framework/view/IViewData';
import { IIde } from './lib/ide/appData/IIde';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';

import { View } from './lib/framework/view/View';
import './index.css';
import appReducer from './lib/ide/reducers/appReducer';
import * as Actions from './lib/ide/actions';
import Theme from './lib/ide/view/Theme';
import { IApp } from './lib/ide/appData/IApp';
import { CreateGuid } from './lib/CreateGuid';
import { ItemTypes } from './lib/ide/appData/ItemTypes'

const initialState: IApp = {
  Id: CreateGuid(),
  ItemType: ItemTypes.ITEM_TYPE_APP,
  Ide: {
    Id: CreateGuid(),
    ItemType: ItemTypes.ITEM_TYPE_IDE,
    InstanceId: 'asdasd',
    Project: {
      Id: CreateGuid(),
      ItemType: ItemTypes.ITEM_TYPE_PROJECT,
      Name: 'Basic name',
      Items: [
        {
          Id: CreateGuid(),
          ItemType: ItemTypes.ITEM_TYPE_STRING,
          Name: 'Bugaga',
          Value: 'Bugagashenka',
          Tags: [],
          Items: []
        }
      ]
    }
  }
};

const store: Store<IApp> = createStore(
  appReducer,
  initialState,
  applyMiddleware(reduxLogger)
) as Store<IApp>;

const dispatchAction = function(action: IAction)
{
  store.dispatch(action);
}

const domElement = document.getElementById('appRoot');
store.subscribe(() => {
  const state = store.getState() as IApp;
  ReactDOM.render(
    <View data={state} viewData={{theme: Theme, callback: dispatchAction}} />,
    domElement
  );
});

store.dispatch(Actions.noOperation());
