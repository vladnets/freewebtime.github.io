import * as React from 'react';
import { IAppState } from '../../../api/IAppState';
import { IFunctionInterface } from '../../../api/project/IInterface';

export interface IFunctionEditorViewProps {
  appState: IAppState;
  symbol: IFunctionInterface;
}

export class FunctionEditorView extends React.Component<IFunctionEditorViewProps> {
  render () {
    return (
      <div>
        Function Editor
      </div>
    )
  }
}