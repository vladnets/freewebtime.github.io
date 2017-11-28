import { ObjectEditorView } from './ObjectEditorView';
import { FunctionCallEditorView } from './FunctionCallEditorView';
import * as React from 'react';
import { IAppState } from '../../../api/IAppState';
import { IInterface } from '../../../api/project/IInterface';
import { IFunctionCallItem, IItem, ItemType, IObjectItem, ISourceCodeItem } from '../../../api/project/IItem';
import { SourceCodeEditorView } from './SourceCodeEditorView';

export interface IItemEditorViewProps {
  appState: IAppState;
  symbol: IItem;
}

export class ItemEditorView extends React.Component<IItemEditorViewProps> {
  render () {

    const symbol = this.props.symbol;
    switch (symbol.itemType) {
      case ItemType.FunctionCall:
      {
        const fCall = symbol as IFunctionCallItem;
        if (fCall) {
          return (<FunctionCallEditorView appState={this.props.appState} symbol={fCall} />)
        }
      } break;
    
      case ItemType.Object:
      {
        const obj = symbol as IObjectItem;
        if (obj) {
          return (<ObjectEditorView appState={this.props.appState} symbol={obj} />)
        }
      } break;
    
      case ItemType.SourceCode:
      {
        const sourceCode = symbol as ISourceCodeItem;
        if (sourceCode) {
          return (<SourceCodeEditorView appState={this.props.appState} symbol={sourceCode} />)
        }
      } break;
    
      default: break;
    }

    return false;
  }
}