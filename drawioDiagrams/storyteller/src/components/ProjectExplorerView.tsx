import * as React from 'react';
import { IProjectViewState } from './ProjectView';
import { ProjectExplorerItemsView } from './ProjectExplorerItemsView';

export class ProjectExplorerView extends React.Component<{appState: any, pvState: IProjectViewState}> {
  render() {
    return (
      <div className={'project-explorer container-vertical'}>
        <div className={'project-explorer-header'}>
          EXPLORER
        </div>
        <div className={'project-explorer-content'}>
          <ProjectExplorerItemsView appState={this.props.appState} pvState={this.props.pvState} />
        </div>  
      </div>      
    );
  }
}