import * as React from 'react';
import { IAppState } from '../../../api/IAppState';
import { IObjectItem } from '../../../api/project/IItem';

export interface IObjectEditorViewProps {
  appState: IAppState;
  symbol: IObjectItem;
}

export class ObjectEditorView extends React.Component<IObjectEditorViewProps> {
  render () {
    return (
      <div>
        Object Editor
      </div>
    )
  }
}