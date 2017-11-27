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
  selectedEditorId?: string;
  handleItemClick: (itemId: string) => void;
  openEditor: (itemId: string) => void;
  closeEditor: (itemId: string) => void;
}

export class ProjectView extends React.Component<{appState: any}, IProjectViewState> {
  state: IProjectViewState = {
    selectedItemId: 'System.Concat_String.SourceCode', 
    opennedEditors: {},
    handleItemClick: (itemId: string) => {
      this.selectItem(itemId);
    },
    openEditor: (itemId: string) => {
      this.openEditor(itemId);
    },
    closeEditor: (itemId: string) => {
      this.closeEditor(itemId);
    }
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
        selectedEditorId: existedEditor.id,
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
      selectedEditorId: editor.id,
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