import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IAppState } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';

export class AppView extends ViewBase<{data: IAppState}> {
  render() {
    return (
      <div className={'app-content'}>
        <ProjectView data={this.props.data.project} />
      </div>
    );
  }
} 