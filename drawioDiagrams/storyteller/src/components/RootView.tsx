import { AppView } from './AppView';
import { ViewBase } from './View';
import { Store } from 'redux';
import * as React from 'react';
import { IHash } from '../api/IHash';

export class RootView extends ViewBase<{store: any}> {
  render() {
    return (
      <AppView 
        data={this.props.store.getState()} 
      />
    );
  }
} 