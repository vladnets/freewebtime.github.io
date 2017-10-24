import { ViewBase } from '../View';
import { IProject } from '../../api/IAppState';
import * as React from 'react';

export class StatusBarView extends ViewBase<{data: IProject}> {
  render() {
    return (
      <div className={'status-bar-view'}>
        Application status...
      </div>
    );
  }
} 