import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IProjectViewState } from './ProjectView';
import { ObjectPropertiesView } from './ObjectPropertiesView';
import { SidebarView, SidebarOrientation } from './SidebarView';

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
      <SidebarView orientation={SidebarOrientation.Right} icons={this.iconsView()}>
        <ObjectPropertiesView appState={this.props.appState} pvState={this.props.pvState} />
      </SidebarView>
    )
  }

  renderOld() {
    return (
      <div className={'container-horizontal right-sidebar-container app-panel'}>
        <div className={'right-sidebar-content container-vertical'}>
          <ObjectPropertiesView appState={this.props.appState} pvState={this.props.pvState} />
        </div>
        <div className={'container-vertical right-sidebar-icons-container'}>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="wrench" />
          </div>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="tag" />
          </div>
          <div className={'left-sidebar-icons-item'}>
            <FontAwesome name="navicon" />
          </div>
        </div>
      </div>
    )
  }
}