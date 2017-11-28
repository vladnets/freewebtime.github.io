import { ISymbol } from '../../../api/project/ISymbol';
import { IProjectViewState } from '../ProjectView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { CardboardView } from './CarboardView';
import { EditorsTabsView } from './EditorsTabsView';
import { IAppState } from '../../../api/IAppState';
import { EditorType, IEditorProps } from './EditorView';
import { SymbolEditorView } from './SymbolEditorView';
import { resolveReference } from '../../../helpers/index';

export class EditorsContainerView extends React.Component<{appState: IAppState, pvState: IProjectViewState}> {
  
  graphEditorView = (editorProps: IEditorProps) => {

    const symbol = resolveReference(editorProps.symbol, this.props.appState.project);
    if (symbol) {
      return (
        <SymbolEditorView appState={this.props.appState} symbol={symbol} pvState={this.props.pvState} />
      )
    }

    return false;
  }

  activeEditorView = () => {
    const pvState = this.props.pvState;
    const appState = this.props.appState;
    const activeEditorId = pvState.activeEditorId;
    if (activeEditorId) {
      const activeEditorProps = pvState.opennedEditors[activeEditorId];
      if (activeEditorProps) {
        switch (activeEditorProps.editorType) {
          case EditorType.Graph:
          {
            return this.graphEditorView(activeEditorProps);
          } 
        
          default: break;
        }
      }
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