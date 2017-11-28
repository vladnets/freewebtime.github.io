import { CardboardView } from './CarboardView';
import { IProjectViewState } from '../ProjectView';
import * as React from 'react';
import { IAppState } from '../../../api/IAppState';
import { ISymbol, SymbolType } from '../../../api/project/ISymbol';
import { IInterface } from '../../../api/project/IInterface';
import { IItem } from '../../../api/project/IItem';

export interface ISymbolEditorProps {
  appState: IAppState;
  pvState: IProjectViewState;
  symbolId: string;
}

export class SymbolEditorView extends React.Component<ISymbolEditorProps> {
  render () {
    return (
      <CardboardView rootSymbolId={this.props.symbolId} appState={this.props.appState} pvState={this.props.pvState}/>
    )
  }
}