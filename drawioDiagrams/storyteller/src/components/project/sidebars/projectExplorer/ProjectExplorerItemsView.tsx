import { resolveReferenceFast } from '../../../../helpers';
import { getStructureRoot } from '../../../../helpers/projectStructureHelper';
import { ISymbol, SymbolType } from '../../../../api/project/ISymbol';
import { IAppState } from '../../../../api/IAppState';
import * as React from 'react';
import { IPetviProps, ProjectExplorerTreeViewItem } from './ProjectExplorerTreeViewItem';
import { IProjectViewState } from '../../ProjectView';
import { IInterface, InterfaceType } from '../../../../api/project/IInterface';
import { IItem, ItemType } from '../../../../api/project/IItem';
import { IProjectStructureItem } from '../../../../api/project/IProjectStructureItem';

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
      {
        Object.keys(project.structure.rootItems).map((itemId: string) => {
          return (
            <ProjectExplorerTreeViewItem key={itemId} structureItemId={itemId} level={0} appState={appState} pvState={this.props.pvState} />
          )
        })
      }
      </div>
    );
  }
}
