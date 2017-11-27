import * as React from 'react';
import { EditorsContainerView } from './EditorsContainerView';
import { LeftSidebarView } from './sidebars/LeftSidebarView';
import { RightSidebarView } from './sidebars/RightSidebarView';

export interface IProjectViewState {
  selectedItemId: string;
  handleItemClick: (itemId: string) => void;
}

export class ProjectView extends React.Component<{appState: any}, IProjectViewState> {
  state: IProjectViewState = {
    selectedItemId: 'basic types', 
    handleItemClick: (itemId: string) => {
      this.selectItem(this, itemId);
    }
  }
  
  selectItem(self: ProjectView, itemId: string) {
    self.setState({
      ...self.state,
      selectedItemId: itemId,
    });
  }
  
  render () {
    return (
      <div className={'project-view'}>
        <div className={'project-content container-vertical'}>
          <div className={'container-horizontal main-menu-container app-panel'}>
            Main menu
          </div>
          <div className={'container-horizontal middle-content-container'}>
            <LeftSidebarView appState={this.props.appState} pvState={this.state} />
            <EditorsContainerView appState={this.props.appState} />
            <RightSidebarView appState={this.props.appState} pvState={this.state} />
          </div>
          <div className={'container-horizontal footer-container'}>
            Footer content
          </div>
        </div>
      </div>
    )
  }
}