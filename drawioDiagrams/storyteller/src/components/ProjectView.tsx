import { IProject } from '../api/IProject';
import { ViewBase } from './View';
import * as React from 'react';

export class ProjectView extends ViewBase<{data: IProject}> {
  render() {
    console.log(this.props.data);

    return (
      <div>
        Project content!
      </div>
    )
  }
}