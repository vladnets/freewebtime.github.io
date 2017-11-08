import { ProjectView } from './Project/ProjectView';
import { ViewBase } from './View';
import { IAppState, IDrawState } from '../api/IAppState';
import { Store } from 'redux';
import * as React from 'react';
import { IHash } from '../api/IHash';

export class AppView extends ViewBase<{data: IAppState, drawState: IDrawState}> {
  render() {
    return (
      <div className={'app-content'}>
        <ProjectView 
          data={this.props.data.project} 
          drawState={this.props.drawState}
          socketsData={this.props.data.socketsData}
          resources={this.props.data.resources}
        />
      </div>
    );
  }
} 