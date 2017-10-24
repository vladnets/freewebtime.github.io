import { AppView } from './AppView';
import { ViewBase } from './View';
import { Store } from 'redux';
import * as React from 'react';

export class RootView extends ViewBase<{store: any}> {
  render() {
    return (
      <AppView data={this.props.store.getState()} />
    );
  }
} 