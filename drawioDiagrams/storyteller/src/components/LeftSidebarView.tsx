import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IProjectViewState } from './ProjectView';
import { ProjectExplorerView } from './ProjectExplorerView';

export class LeftSidebarView extends React.Component<{appState: any, pvState: IProjectViewState}> {
  render() {
    return (
      <div className={'container-horizontal left-sidebar-container app-panel'}>
        <div className={'container-vertical left-sidebar-icons-container'}>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="file-text" />
          </div>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="tag" />
          </div>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="sticky-note" />
          </div>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="navicon" />
          </div>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="code-fork" />
          </div>
        </div>
        <div className={'left-sidebar-content container-vertical'}>
          <ProjectExplorerView appState={this.props.appState} pvState={this.props.pvState} />
        </div>
      </div>
    )
  }
}
