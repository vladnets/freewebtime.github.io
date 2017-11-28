import * as React from 'react';
import { IAppState } from '../../../api/IAppState';
import { IStructureInterface } from '../../../api/project/IInterface';

export interface IStructureEditorViewProps {
  appState: IAppState;
  symbol: IStructureInterface;
}

export class StructureEditorView extends React.Component<IStructureEditorViewProps> {
  render () {
    return (
      <div>
        Structure Editor
      </div>
    )
  }
}