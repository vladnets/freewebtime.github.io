import { IProject } from '../../api/project/IProject';
import { ViewBase } from '../View';
import * as React from 'react';

export class StatusBarView extends ViewBase<{data: IProject}, {}> {
  render() {
    return (
      <div className={'status-bar-view'}>
        Application status...
      </div>
    );
  }
} 