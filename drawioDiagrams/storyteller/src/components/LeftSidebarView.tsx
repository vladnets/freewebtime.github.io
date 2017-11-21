import { SidebarView, SidebarOrientation } from './SidebarView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IProjectViewState } from './ProjectView';
import { ProjectExplorerView } from './ProjectExplorerView';
import { appConfig } from '../config/appConfig';

export class LeftSidebarView extends React.Component<{appState: any, pvState: IProjectViewState}> {
  
  iconsView = () => {
    const items = [
      'file-text',
      'tag',
      'sticky-note',
      'navicon',
      'code-fork',
    ];
    
    return (
      items.map((item: string) => {
        return (
          <div key={item} className={'left-sidebar-icons-item'}>
            <FontAwesome name={item} />
          </div>
        )
      })
    )
  }

  render() {
    return (
      <SidebarView orientation={SidebarOrientation.Left} icons={this.iconsView()}>
        <ProjectExplorerView appState={this.props.appState} pvState={this.props.pvState} />
      </SidebarView>
    )
  }
}
