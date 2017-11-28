import * as React from 'react';
import { IAppState } from '../../../api/IAppState';
import { IPrimitiveInterface } from '../../../api/project/IInterface';

export interface IPrimitiveEditorViewProps {
  appState: IAppState;
  symbol: IPrimitiveInterface;
}

export class PrimitiveEditorView extends React.Component<IPrimitiveEditorViewProps> {
  render () {
    return (
      <div>
        Primitive Editor
      </div>
    )
  }
}