import { IAppState } from '../../../../api/IAppState';
import * as React from 'react';
import { IPetviProps, ProjectExplorerTreeViewItem } from './ProjectExplorerTreeViewItem';
import { IProjectViewState } from '../../ProjectView';
import { resolveReference } from '../../../../helpers/projectHeler';

interface IPeivState {
  rootItem: IPetviProps;
}

export class ProjectExplorerItemsView extends React.Component<{appState: IAppState, pvState: IProjectViewState}, IPeivState> {
  
  itemColor = 'var(--explorer-item-color-file)';
  interfaceColor = 'var(--explorer-item-color-folder)';

  render () {
    const folderColor = this.interfaceColor;
    const fileColor = this.itemColor;

    const className = 'project-explorer-items';
    const appState = this.props.appState;
    const project = appState.project; 

    return (
      <div className={className}>
        <ProjectExplorerTreeViewItem key={project.id} cardId={project.id} level={0} appState={appState} pvState={this.props.pvState} />
      </div>
    );
  }
}
