import { AppView } from './view/App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';

import './index.css';
import 'antd/dist/antd.css';
import { IApp } from './api/IApp';
import { appConfig } from './config/appConfig';
import { IAction } from './api/IAction';
import { appReducer } from './reducers/appReducer';

const store: Store<IApp> = createStore(
  appReducer,
  appConfig.InitialState,
  applyMiddleware(reduxLogger)
) as Store<IApp>;

const dispatchAction = function(action: IAction)
{
  store.dispatch(action);
}

const renderState = function(state: any, dispatchAction: (action: IAction)=> void) {
  ReactDOM.render(
    <AppView app={state} />,
    domElement
  );
}

store.dispatch({type: appConfig.ActionTypes.NODE_CALC_OUTPUT, payload: appConfig.InitialState}); 

const domElement = document.getElementById('appRoot');
store.subscribe(() => {
  const state = store.getState();
  renderState(state, dispatchAction);
});

renderState(store.getState(), dispatchAction); 

