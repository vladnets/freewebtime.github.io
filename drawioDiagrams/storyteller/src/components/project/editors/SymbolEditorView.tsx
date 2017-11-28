import * as React from 'react';
import { IAppState } from '../../../api/IAppState';
import { ISymbol, SymbolType } from '../../../api/project/ISymbol';
import { InterfaceEditorView } from './InterfaceEditorView';
import { IInterface } from '../../../api/project/IInterface';
import { IItem } from '../../../api/project/IItem';
import { ItemEditorView } from './ItemEditorView';

export interface ISymbolEditorProps {
  appState: IAppState;
  symbol: ISymbol;
}

export class SymbolEditorView extends React.Component<ISymbolEditorProps> {
  render () {
    const symbol = this.props.symbol;

    switch (symbol.symbolType) {
      case SymbolType.Interface:
      {
        const intrface = symbol as IInterface;
        if (intrface) {
          return (<InterfaceEditorView appState={this.props.appState} symbol={intrface} />)
        }
      } 

      case SymbolType.Item:
      {
        const item = symbol as IItem;
        if (item) {
          return (<ItemEditorView appState={this.props.appState} symbol={item} />)
        }
      }
      
      default: break;
    }

    return false;
  }
}