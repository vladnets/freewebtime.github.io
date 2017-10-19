import { ViewBase } from './View';
import * as React from 'react';
import { IProject } from '../api/IAppState';
import { ProjectExplorerView } from './ProjectExplorerView';

export class ProjectView extends ViewBase<{data: IProject}> {
  render() {
    console.log(this.props);

    return (
      <div className={'project-view'}>
        <ProjectExplorerView data={this.props.data}/>
      </div>
    )
  }
}