import { resolveReference } from '../../helpers';
import { IEditorProps, EditorType } from './editors/EditorView';
import * as React from 'react';
import { LeftSidebarView } from './sidebars/LeftSidebarView';
import { RightSidebarView } from './sidebars/RightSidebarView';
import { IHash } from '../../api/IHash';
import { EditorsContainerView } from './editors/EditorsContainerView';
import { resolveReferenceFast, createReference } from '../../helpers/index';

export interface IProjectViewState {
  selectedItemId: string;
  opennedEditors: IHash<IEditorProps>;
  activeEditorId?: string;
  isLeftSidebarCollapsed: boolean;
  isRightSidebarCollapsed: boolean;
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
    selectedItemId: 'System.Concat_String.SourceCode', 
    opennedEditors: {},
    isLeftSidebarCollapsed: false,
    isRightSidebarCollapsed: true,
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

    console.log('toggle right sidebar called!', this.state);
  }

  selectItem = (itemId: string) => {
    this.setState({
      ...this.state,
      selectedItemId: itemId,
    });
  }

  openEditor = (itemId: string) => {
    const existedEditor = this.state.opennedEditors[itemId];
    if (existedEditor) {
      this.setState({
        ...this.state,
        activeEditorId: existedEditor.id,
      });

      return;
    }
    
    const project = this.props.appState.project;
    const symbol = resolveReferenceFast(itemId, project);
    if (!symbol) {
      return;
    }

    const editor: IEditorProps = {
      id: itemId,
      appState: this.props.appState,
      editorType: EditorType.Graph,
      symbol: createReference(symbol),
    }
    this.setState({
      ...this.state,
      opennedEditors: {
        ...this.state.opennedEditors,
        [editor.id]: editor,
      },
      activeEditorId: editor.id,
    });
  }

  closeEditor = (editorId: string) => {
    const newEditors = {...this.state.opennedEditors}
    delete newEditors[editorId];
    this.setState({
      ...this.state,
      opennedEditors: newEditors,
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