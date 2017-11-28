import { ISymbol } from '../../../api/project/ISymbol';
import { IProjectViewState } from '../ProjectView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { CardboardView } from './CarboardView';
import { EditorsTabsView } from './EditorsTabsView';
import { IAppState } from '../../../api/IAppState';
import { SymbolEditorView } from './SymbolEditorView';
import { resolveReference, resolveReferenceFast } from '../../../helpers/index';

export class EditorsContainerView extends React.Component<{appState: IAppState, pvState: IProjectViewState}> {
  
  graphEditorView = (editorId: string) => {

    const appState = this.props.appState;
    const symbol = resolveReferenceFast(editorId, appState.project);
    if (symbol) {
      return (
        <SymbolEditorView appState={this.props.appState} symbolId={symbol.fullId} pvState={this.props.pvState} />
      )
    }

    return false;
  }

  activeEditorView = () => {
    const editorId = this.props.pvState.activeEditorId;
    if (editorId) {
      return this.graphEditorView(editorId);
    }

    return false;
  }
  
  render () {
    return (
      <div className={'editors-container container-vertical'} >
        <EditorsTabsView appState={this.props.appState} pvState={this.props.pvState}/>

        <div className={'editor-root container-vertical'}>
        {this.activeEditorView()}
        </div>
      </div>
    )
  }
}