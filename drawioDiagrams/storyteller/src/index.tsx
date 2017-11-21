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

const renderView = (store: any) => {
  
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

