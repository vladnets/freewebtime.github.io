import * as React from 'react';
import { IAppState } from '../../../api/IAppState';
import { IFunctionCallItem } from '../../../api/project/IItem';

export interface IFunctionCallEditorViewProps {
  appState: IAppState;
  symbol: IFunctionCallItem;
}

export class FunctionCallEditorView extends React.Component<IFunctionCallEditorViewProps> {
  render () {
    return (
      <div>
        FunctionCall Editor
      </div>
    )
  }
}