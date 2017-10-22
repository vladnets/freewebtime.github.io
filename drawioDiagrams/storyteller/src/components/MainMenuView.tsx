import { IAppResources } from '../api/IAppResources';
import { StatusBarView } from './StatusBarView';
import { NodeGraphView } from './NodeGraphView';
import { ViewBase } from './View';
import * as React from 'react';
import { IProject } from '../api/IAppState';
import { ProjectExplorerView } from './ProjectExplorerView';
import { Segment, Menu, Dropdown, Icon } from 'semantic-ui-react';

export class MainMenuView extends ViewBase<{data: IProject, resources: IAppResources}> {
  render() {
    return (
      <div className={'main-menu-view'}>
        <div className={'container-horizontal main-menu-view-container'}>
          <div className={'main-menu-item'}>
            Main menu
          </div>
          <div className={'main-menu-item'}>
            {this.props.data.projectData.name}
          </div>
          <div className={'main-menu-item'}>
            {this.props.data.projectData.name}
          </div>
        </div>
      </div>
    )
  }
}