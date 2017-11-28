import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IProjectViewState } from '../ProjectView';

export enum SidebarOrientation {
  Left,
  Right,
}

export interface ISidebarViewProps {
  className?: string;
  style?: any;
  orientation: SidebarOrientation;
  icons: {};
  isCollapsed: boolean;
  pvState: IProjectViewState;
}

export class SidebarView extends React.Component<ISidebarViewProps> {

  expandSidebar = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    const pvState = this.props.pvState;
    switch (this.props.orientation) {
      case SidebarOrientation.Left:
      {
        pvState.openLeftSidebar();  
      } break;
      case SidebarOrientation.Right:
      {
        pvState.openRightSidebar();  
      } break;
    
      default: break;
    }
  }
  toggleSidebar = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    const pvState = this.props.pvState;
    switch (this.props.orientation) {
      case SidebarOrientation.Left:
      {
        pvState.toggleLeftSidebar();  
      } break;
      case SidebarOrientation.Right:
      {
        pvState.toggleRightSidebar();  
      } break;
    
      default: break;
    }
  }
  iconsView = () => {
    return (
      <div className={'container-vertical sidebar-icons-container'} onClick={this.toggleSidebar}>
      {this.props.icons}
      </div>
    )
  }

  childrenView = (className: string) => {
    if (this.props.isCollapsed === true) {
      return false;
    }

    return (
      <div className={className + ' container-vertical'}>
        {this.props.children}
      </div>
    )
  }

  leftSidebarView = () => {
    return (
      <div className={'container-horizontal left-sidebar-container app-panel'}>
        {this.iconsView()}
        {this.childrenView('left-sidebar-content')}
      </div>
    )
  }

  rightSidebarView = () => {
    return (
      <div className={'container-horizontal right-sidebar-container app-panel'}>
        {this.childrenView('right-sidebar-content')}
        {this.iconsView()}
      </div>
    )
  }

  render() {
    switch (this.props.orientation) {
      case SidebarOrientation.Left:
      return this.leftSidebarView();

      case SidebarOrientation.Right:
      return this.rightSidebarView();

      default:
      return false;
    }
  }
}
