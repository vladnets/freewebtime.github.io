import { AppView } from './AppView';
import { ViewBase } from './View';
import * as React from 'react';
import { IAppResources } from '../api/IAppResources';
import { IViewItem } from '../api/IViewItem';
import { Provider } from 'react-redux';

export class AppRootView extends ViewBase<{store: any}> {
  render(): any {
    return (
      <Provider store={this.props.store}>
        <AppView />
      </Provider>
    )
  }
}