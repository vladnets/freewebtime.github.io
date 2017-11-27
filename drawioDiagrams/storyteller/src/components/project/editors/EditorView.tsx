import { IReference } from '../../../api/project/IReference';
import * as React from 'react';
import { IAppState } from '../../../api/IAppState';

export enum EditorType {
  Graph,
}

export interface IEditorProps {
  id: string;
  editorType: EditorType;
  appState: IAppState;
  symbol?: IReference;
}

export class EditorView extends React.Component<IEditorProps> {
  render() {
    return (
      <div>
        Editor
      </div>
    )
  }
}