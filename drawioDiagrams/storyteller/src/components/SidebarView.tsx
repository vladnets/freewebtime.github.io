import * as React from 'react';
import * as ReactDOM from 'react-dom';

export enum SidebarOrientation {
  Left,
  Right,
}

export interface ISidebarViewProps {
  className?: string;
  style?: any;
  orientation: SidebarOrientation;
  icons: {};
}

export class SidebarView extends React.Component<ISidebarViewProps> {
  state = {
    isExpanded: true,
  }

  toggleExpand = () => {
    this.setState({
      ...this.state,
      isExpanded: !this.state.isExpanded
    })
  }

  iconsView = () => {
    return (
      <div className={'container-vertical sidebar-icons-container'}>
      {this.props.icons}
      </div>
    )
  }

  leftSidebarView = () => {
    return (
      <div className={'container-horizontal left-sidebar-container app-panel'}>
        {this.iconsView()}
        <div className={'left-sidebar-content container-vertical'}>
          {this.props.children}
        </div>
      </div>
    )
  }

  rightSidebarView = () => {
    return (
      <div className={'container-horizontal left-sidebar-container app-panel'}>
        <div className={'left-sidebar-content container-vertical'}>
          {this.props.children}
        </div>
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
