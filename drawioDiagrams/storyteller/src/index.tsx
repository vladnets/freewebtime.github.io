import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';

import { App } from './App';
import './index.css';
import appReducer from './lib/ide/reducers/appReducer';
import * as Actions from './lib/ide/actions/actions';
import { projectChangeName } from './lib/ide/actions/actions';

const initialState: any = {
};

const store: Store<any> = createStore(
  appReducer,
  initialState,
  applyMiddleware(reduxLogger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('appRoot')
);

console.log(store.getState());

store.dispatch(Actions.noOperation());
store.dispatch(Actions.projectChangeName('Supercool project'));
