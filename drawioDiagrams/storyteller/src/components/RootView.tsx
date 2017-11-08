import { AppView } from './AppView';
import { ViewBase } from './View';
import { Store } from 'redux';
import * as React from 'react';
import { IHash } from '../api/IHash';
import { IDrawState } from '../api/IAppState';

export class RootView extends ViewBase<{store: any; drawState: IDrawState}> {
  render() {
    return (
      <AppView 
        data={this.props.store.getState()} 
        drawState={this.props.drawState} 
      />
    );
  }
} 