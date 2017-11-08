import { ISocketsData } from '../../api/IAppState';
import { FindGraphNodeDialog } from './FindGraphNodeDialog';
import { MainMenuView } from './MainMenuView';
import { ProjectExplorerView } from './ProjectExplorerView';
import { EditorsPaneView } from './EditorsPaneView';
import { StatusBarView } from './StatusBarView';
import { ViewBase } from '../View';
import { IAppResources } from '../../api/IAppResources';
import * as React from 'react';
import { IHash } from '../../api/IHash';
import { IProject } from '../../api/project/IProject';
import './Project.css';

export class ProjectView extends ViewBase<{data: IProject, resources: IAppResources}> {
  render() {
    return (
      <div className={'project-view'} style={{display: 'flex', flexDirection: 'column'}}>
        <div className={'top-line-container panel padding'} >
          <MainMenuView data={this.props.data} resources={this.props.resources}/>
        </div>
        <div className={'middle-line-container'} style={{display: 'flex', flexDirection: 'row', flexGrow: 1}}>
          <div className={'sidebar sidebar-left panel'}>
            <ProjectExplorerView data={this.props.data} resources={this.props.resources}/>
          </div>
          <div className={'openned-editors-container '} style={{flexGrow: 1}}>
            <div className={'panel padding'}>
              Project > Root Item > Types > etc.
            </div>
            <EditorsPaneView 
              data={this.props.data} 
              resources={this.props.resources} 
            />
          </div>
          <div className={'sidebar sidebar-right panel padding'} style={{width: '80px', display: 'none'}}>
            <div className={'fullheight fullwidth'}>
              Right sidebar content
            </div>
          </div>
        </div>
        <div className={'bottom-line-container panel padding'}>
          <StatusBarView data={this.props.data}/>
        </div>
        <FindGraphNodeDialog project={this.props.data} resources={this.props.resources} />
      </div>
    )
  }
}
