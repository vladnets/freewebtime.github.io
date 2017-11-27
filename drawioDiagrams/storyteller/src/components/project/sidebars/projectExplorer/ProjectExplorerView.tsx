import * as React from 'react';
import { ProjectExplorerItemsView } from './ProjectExplorerItemsView';
import { IProjectViewState } from '../../ProjectView';

export class ProjectExplorerView extends React.Component<{appState: any, pvState: IProjectViewState}> {
  
  handleHeaderClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const pvState = this.props.pvState;
    pvState.closeLeftSidebar();
  }
  
  render() {
    return (
      <div className={'project-explorer container-vertical'}>
        <div className={'project-explorer-header'} onClick={this.handleHeaderClick}>
          EXPLORER
        </div>
        <div className={'project-explorer-content'}>
          <ProjectExplorerItemsView appState={this.props.appState} pvState={this.props.pvState} />
        </div>  
      </div>      
    );
  }
}