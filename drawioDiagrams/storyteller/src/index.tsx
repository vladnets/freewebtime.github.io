import { areObjectsEqual } from './helpers';
import { IAppState } from './api/IAppState';
import { appConfig } from './config/appConfig';
import { saveState } from './helpers/LocalStorageHelper';
import { RootView } from './components/RootView';
import { render } from 'react-dom';
import 'react-contexify/dist/ReactContexify.min.css';
// import './components/Theme.css';
// import './index.css';
import { configureStore } from './configureStore';
import * as React from 'react';
import throttle from 'lodash/throttle';
import { TemplateView } from './components/TemplateView';

const renderView = (store: any) => {
  
  if (appConfig.IsShowTemplate) {
    render(
      <TemplateView data={store.getState()} />,
      document.getElementById('appRoot')
    )

    return;
  }

  render(
    <RootView store={store} />,
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

