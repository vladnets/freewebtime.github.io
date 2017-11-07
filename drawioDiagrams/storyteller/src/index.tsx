import { areObjectsEqual } from './helpers';
import { IAppState } from './api/IAppState';
import { appConfig } from './config/appConfig';
import { saveState } from './helpers/LocalStorageHelper';
import { RootView } from './components/RootView';
import { render } from 'react-dom';
import 'react-contexify/dist/ReactContexify.min.css';
import './components/Theme.css';
import './index.css';
import { configureStore } from './configureStore';
import * as React from 'react';
import throttle from 'lodash/throttle';

const renderView = (store: any) => {
  const visibleSockets = {};

  const oldState: IAppState = store.getState();

  render(
    <RootView store={store} visibleSockets={visibleSockets} />,
    document.getElementById('appRoot')
  );

  const socketsData = oldState.socketsData;
  const oldVisibleSockets = socketsData ? socketsData.visibleSockets : {};
  if (!areObjectsEqual(visibleSockets, oldVisibleSockets)) {
    store.dispatch(appConfig.Actions.InoutSocketsSetVisibleSockets(visibleSockets));
  }
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

