import * as React from 'react';
import { LeftSidebarView } from './sidebars/LeftSidebarView';
import { RightSidebarView } from './sidebars/RightSidebarView';
import { IHash } from '../../api/IHash';
import { EditorsContainerView } from './editors/EditorsContainerView';

export interface IProjectViewState {
  selectedItemId: string;
  opennedEditors: IHash<string>;
  activeEditorId?: string;
  isLeftSidebarCollapsed: boolean;
  isRightSidebarCollapsed: boolean;
  isShowTypeReferences: boolean;
  isShowFooters: boolean;
  isShowValueReferences: boolean;

  handleItemClick: (itemId: string) => void;
  openEditor: (itemId: string) => void;
  closeEditor: (itemId: string) => void;
  openLeftSidebar: () => void;
  closeLeftSidebar: () => void;
  toggleLeftSidebar: () => void;
  openRightSidebar: () => void;
  closeRightSidebar: () => void;
  toggleRightSidebar: () => void;
}

export class ProjectView extends React.Component<{appState: any}, IProjectViewState> {
  state: IProjectViewState = {
    selectedItemId: 'New Project', 
    opennedEditors: {
      'New Project.Character':'New Project.Character',
      'New Project':'New Project',
    },
    activeEditorId: 'New Project',
    isLeftSidebarCollapsed: false,
    isRightSidebarCollapsed: true,
    isShowTypeReferences: true,
    isShowValueReferences: false,
    isShowFooters: false,
    handleItemClick: (itemId: string) => {
      this.selectItem(itemId);
    },
    openEditor: (itemId: string) => {
      this.openEditor(itemId);
    },
    closeEditor: (itemId: string) => {
      this.closeEditor(itemId);
    },

    openLeftSidebar: () => {this.openLeftSidebar()},
    closeLeftSidebar: () => {this.closeLeftSidebar()},
    toggleLeftSidebar: () => {this.toggleLeftSidebar()},
    openRightSidebar: () => {this.openRightSidebar()},
    closeRightSidebar: () => {this.closeRightSidebar()},
    toggleRightSidebar: () => {this.toggleRightSidebar()},
  }

  openLeftSidebar = () => {
    this.setState({
      ...this.state,
      isLeftSidebarCollapsed: false,
    })
  }
  closeLeftSidebar = () => {
    this.setState({
      ...this.state,
      isLeftSidebarCollapsed: true,
    })
  }
  toggleLeftSidebar = () => {
    this.setState({
      ...this.state,
      isLeftSidebarCollapsed: !this.state.isLeftSidebarCollapsed,
    })
  }
  openRightSidebar = () => {
    this.setState({
      ...this.state,
      isRightSidebarCollapsed: false,
    })
  }
  closeRightSidebar = () => {
    this.setState({
      ...this.state,
      isRightSidebarCollapsed: true,
    })
  }
  toggleRightSidebar = () => {
    this.setState({
      ...this.state,
      isRightSidebarCollapsed: !this.state.isRightSidebarCollapsed,
    })
  }

  selectItem = (itemId: string) => {
    this.setState({
      ...this.state,
      selectedItemId: itemId,
    });
  }

  openEditor = (itemId: string) => {
    if (!this.state.opennedEditors[itemId] || this.state.activeEditorId !== itemId) {
      this.setState({
        ...this.state,
        opennedEditors: {
          ...this.state.opennedEditors,
          [itemId]: itemId,
        },
        activeEditorId: itemId,
      })
    }
  }

  closeEditor = (editorId: string) => {
    const newEditors = {...this.state.opennedEditors}
    delete newEditors[editorId];
    let activeEditorId = this.state.activeEditorId; 
    if (activeEditorId === editorId) {
      activeEditorId = undefined;
      const editorIds = Object.keys(newEditors);
      if (editorIds.length > 0) {
        activeEditorId = editorIds[0];
      }
    }

    this.setState({
      ...this.state,
      opennedEditors: newEditors,
      activeEditorId: activeEditorId,
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
            <EditorsContainerView appState={this.props.appState} pvState={this.state} />
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