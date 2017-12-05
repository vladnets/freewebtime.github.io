import { RootView } from './components/RootView';
import { areObjectsEqual } from './helpers';
import { appConfig } from './config/appConfig';
import { saveState } from './helpers/LocalStorageHelper';
import { render } from 'react-dom';
import 'react-contexify/dist/ReactContexify.min.css';
// import './components/Theme.css';
// import './index.css';
import { configureStore } from './configureStore';
import * as React from 'react';
import throttle from 'lodash/throttle';
import { IAppState } from './api/IAppState';

const renderView = (store: any) => {
  
  const dispatchAction = (action) => {
    store.dispatch(action);
  }

  const state: IAppState = store.getState();
  if (!state.resources.callback) {
    state.resources.callback = dispatchAction;
  }

  render(
    <RootView appState={store.getState()} />,
    document.getElementById('appRoot')
  );
}
  
const store = configureStore();
store.subscribe(()=>{
  renderView(store);
});

store.subscribe(throttle(() => {
    if (appConfig.IsSaveStateToLocalStorage) {
      saveState(store.getState());
    }
  }, appConfig.SaveStateToLocalStorageInterval)
)

renderView(store);

