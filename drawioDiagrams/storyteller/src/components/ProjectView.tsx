import { IAppResources } from '../api/IAppResources';
import { StatusBarView } from './StatusBarView';
import { NodeGraphView } from './NodeGraphView';
import { ViewBase } from './View';
import * as React from 'react';
import { IProject } from '../api/IAppState';
import { ProjectExplorerView } from './ProjectExplorerView';
import { Segment, Menu, Dropdown, Icon } from 'semantic-ui-react';
import { MainMenuView } from './MainMenuView';
import { EditorsPaneView } from './EditorsPaneView';

export class ProjectView extends ViewBase<{data: IProject, resources: IAppResources}> {
  render() {
    return (
      <div className={'project-view'} style={{display: 'flex', flexDirection: 'column'}}>
        <div className={'top-line-container'} >
          <MainMenuView data={this.props.data} resources={this.props.resources}/>
        </div>
        <div className={'middle-line-container'} style={{display: 'flex', flexDirection: 'row', flexGrow: 1}}>
          <div className={'sidebar sidebar-left'}>
            <ProjectExplorerView data={this.props.data}/>
          </div>
          <div className={'openned-editors-container'} style={{flexGrow: 1}}>
            <EditorsPaneView data={this.props.data} resources={this.props.resources}/>
          </div>
          <div className={'sidebar sidebar-right'} style={{width: '80px'}}>
            <div className={'fullheight fullwidth'}>
              Right sidebar content
            </div>
          </div>
        </div>
        <div className={'bottom-line-container'}>
          <StatusBarView data={this.props.data}/>
        </div>
      </div>
    )
  }
}


// <div className={'main-menu container-vertical fullheight'}>
// <MainMenuView data={this.props.data} resources={this.props.resources}/>

// <div className={'container-horizontal fullheight'}>
//   <ProjectExplorerView data={this.props.data}/>
//   <NodeGraphView data={this.props.data} resources={this.props.resources}/>
// </div>

// <StatusBarView data={this.props.data}/>
// </div>


