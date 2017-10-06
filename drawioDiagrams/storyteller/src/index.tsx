import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxLogger from 'redux-logger';

import { App } from './App';
import './index.css';
import rootReducer from './lib/ide/reducers/rootReducer';

const initialState: any = {
};

const store: Store<any> = createStore(
  rootReducer,
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

// store.dispatch(Actions.noOperation());
// store.dispatch(Actions.ideInitialize());
// store.dispatch(Actions.projectCreate('new project name'));
