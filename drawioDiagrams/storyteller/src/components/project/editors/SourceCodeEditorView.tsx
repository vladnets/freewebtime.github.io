import * as React from 'react';
import { IAppState } from '../../../api/IAppState';
import { ISourceCodeItem } from '../../../api/project/IItem';

export interface ISourceCodeEditorViewProps {
  appState: IAppState;
  symbol: ISourceCodeItem;
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