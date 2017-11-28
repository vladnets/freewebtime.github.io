import * as React from 'react';
import { IAppState } from '../../../api/IAppState';
import { ISourceCodeInterface } from '../../../api/project/IItem';

export interface ISourceCodeEditorViewProps {
  appState: IAppState;
  symbol: ISourceCodeInterface;
}

export class SourceCodeEditorView extends React.Component<ISourceCodeEditorViewProps> {
  render () {
    return (
      <div>
        SourceCode Editor
      </div>
    )
  }
}