import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IAppState } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';

export class NodeGraphView extends ViewBase<{data: IAppState}> {
  render() {
    return (
      <div>
        App content!
        {JSON.stringify(this.props.data)}
      </div>
    );
  }
} 