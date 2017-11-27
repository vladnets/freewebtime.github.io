import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IProjectViewState } from '../ProjectView';
import { SidebarView, SidebarOrientation } from './SidebarView';
import { ObjectPropertiesView } from './ObjectPropertiesView';

export class RightSidebarView extends React.Component<{appState: any, pvState: IProjectViewState}> {
  iconsView = () => {
    const items = [
      'wrench',
      'tag',
      'navicon',
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
      <SidebarView orientation={SidebarOrientation.Right} icons={this.iconsView()} isCollapsed={this.props.pvState.isRightSidebarCollapsed} pvState={this.props.pvState}>
        <ObjectPropertiesView appState={this.props.appState} pvState={this.props.pvState} />
      </SidebarView>
    )
  }
}