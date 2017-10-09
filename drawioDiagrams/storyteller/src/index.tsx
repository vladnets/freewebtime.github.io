import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';

import './index.css';
import { IAction } from './lib/IAction';
import { View } from './lib/View';
import initialState from './lib/initialState';
import appReducer from './lib/appReducer';

const store: Store<any> = createStore(
  appReducer,
  initialState,
  applyMiddleware(reduxLogger)
) as Store<any>;

const dispatchAction = function(action: IAction)
{
  store.dispatch(action);
}

const domElement = document.getElementById('appRoot');
store.subscribe(() => {
  const state = store.getState();
  ReactDOM.render(
    <View data={state.appRoot} viewContext={state.viewContext} />,
    domElement
  );
});

store.dispatch({type: 'No operation'}); 
