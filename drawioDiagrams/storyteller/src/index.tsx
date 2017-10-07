import { IAction } from './lib/framework/actions/IAction';
import { IViewData } from './lib/framework/view/IViewData';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';

import { View } from './lib/framework/view/View';
import './index.css';
import appReducer from './lib/ide/reducers/appReducer';
import Actions from './lib/ide/actions';
import Theme from './lib/ide/view/Theme';
import { IApp } from './lib/ide/appData/IApp';
import ItemTypes from './lib/ide/appData/ItemTypes'
import { NO_OPERATION } from './lib/ide/actions/actionTypes';

const store: Store<IApp> = createStore(
  appReducer,
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



store.dispatch(Actions.app.noOperation());
