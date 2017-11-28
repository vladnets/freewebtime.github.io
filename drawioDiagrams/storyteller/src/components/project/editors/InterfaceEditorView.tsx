import * as React from 'react';
import { IAppState } from '../../../api/IAppState';
import { IFunctionInterface, IInterface, InterfaceType, IPrimitiveInterface, IStructureInterface } from '../../../api/project/IInterface';
import { FunctionEditorView } from './FunctionEditorView';
import { PrimitiveEditorView } from './PrimitiveEditorView';
import { StructureEditorView } from './StructureEditorView';

export interface IInterfaceEditorViewProps {
  appState: IAppState;
  symbol: IInterface;
}

export class InterfaceEditorView extends React.Component<IInterfaceEditorViewProps> {
  render () {

    const symbol = this.props.symbol;
    switch (symbol.interfaceType) {
      case InterfaceType.Function:
      {
        const func = symbol as IFunctionInterface;
        if (func) {
          return (<FunctionEditorView appState={this.props.appState} symbol={func} />) 
        }
      } break;
    
      case InterfaceType.Primitive:
      {
        const primitive = symbol as IPrimitiveInterface;
        if (primitive) {
          return (<PrimitiveEditorView appState={this.props.appState} symbol={primitive} />) 
        }
      } break;
    
      case InterfaceType.Structure:
      {
        const struct = symbol as IStructureInterface;
        if (struct) {
          return (<StructureEditorView appState={this.props.appState} symbol={struct} />) 
        }
      } break;
    
      default:
        break;
    }


    return false;
  }
}