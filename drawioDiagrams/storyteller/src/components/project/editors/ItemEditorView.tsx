import * as React from 'react';
import { IAppState } from '../../../api/IAppState';
import { IInterface } from '../../../api/project/IInterface';
import { IItem } from '../../../api/project/IItem';

export interface IItemEditorViewProps {
  appState: IAppState;
  symbol: IItem;
}

export class ItemEditorView extends React.Component<IItemEditorViewProps> {
  render () {
    return (
      <div>
        Item Editor
      </div>
    )
  }
}