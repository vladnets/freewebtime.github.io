import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IAppState } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';
import { AppView } from './AppView';

export class RootView extends ViewBase<{store: any}> {
  render() {
    return (
      <AppView data={this.props.store.getState()} />
    );
  }
} 