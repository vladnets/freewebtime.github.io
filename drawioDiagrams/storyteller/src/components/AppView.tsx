import { ProjectView } from './Project/ProjectView';
import { ViewBase } from './View';
import { IAppState } from '../api/IAppState';
import { Store } from 'redux';
import * as React from 'react';
import { IHash } from '../api/IHash';

export class AppView extends ViewBase<{data: IAppState, visibleSockets: IHash<string>}> {
  render() {
    return (
      <div className={'app-content'}>
        <ProjectView 
          data={this.props.data.project} 
          visibleSockets={this.props.visibleSockets}
          socketsData={this.props.data.socketsData}
          resources={this.props.data.resources}
        />
      </div>
    );
  }
} 