import { IAppResources } from '../api/IAppResources';
import { StatusBarView } from './StatusBarView';
import { NodeGraphView } from './NodeGraphView';
import { ViewBase } from './View';
import * as React from 'react';
import { IProject } from '../api/IAppState';
import { ProjectExplorerView } from './ProjectExplorerView';
import { Segment, Menu, Dropdown, Icon } from 'semantic-ui-react';
import { MainMenuView } from './MainMenuView';

export class ProjectView extends ViewBase<{data: IProject, resources: IAppResources}> {
  render() {
    return (
      <div className={'project-view'}>
        <div className={'main-menu container-vertical fullheight'}>
          <MainMenuView data={this.props.data} resources={this.props.resources}/>

          <div className={'container-horizontal fullheight'}>
            <ProjectExplorerView data={this.props.data}/>
            <NodeGraphView data={this.props.data}/>
          </div>

          <StatusBarView data={this.props.data}/>
        </div>
      </div>
    )
  }
}