import { rootReducer } from './lib/reducers/rootReducer';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';

import './index.css';
import { IObject } from './lib/api/IObject';
import { IAction } from './lib/api/IAction';
import { View } from './lib/components/View';
import { appConfig } from './lib/config/appConfig';

const store: Store<any> = createStore(
  rootReducer,
  appConfig.InitialState,
  applyMiddleware(reduxLogger)
) as Store<any>;

const dispatchAction = function(action: IAction)
{
  store.dispatch(action);
}

const renderState = function(state: any, dispatchAction: (action: IAction)=> void) {
  // state.viewContext.Callback = dispatchAction;
  ReactDOM.render(
    <View data={state.app} viewContext={state.viewContext} />,
    domElement
  );
}

store.dispatch({type: appConfig.ActionTypes.APP_ACTION_EXECUTE, payload: appConfig.InitialState}); 

const domElement = document.getElementById('appRoot');
store.subscribe(() => {
  const state = store.getState();
  renderState(state, dispatchAction);
});

renderState(store.getState(), dispatchAction); 

