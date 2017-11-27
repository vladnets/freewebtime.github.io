import { resolveReference } from '../../../helpers';
import { IEditorTabViewProps, EditorTabView } from './EditorTabView';
import { IProjectViewState } from '../ProjectView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IAppState } from '../../../api/IAppState';

export class EditorsTabsView extends React.Component<{appState: IAppState, pvState: IProjectViewState}> {
  render () {
    const pvState = this.props.pvState;
    const tabItems = Object.keys(pvState.opennedEditors).map((key: string) => {
      const editor = pvState.opennedEditors[key];
      const reference = editor.symbol;

      let symbolName = 'N/A';
      if (reference) {
        const symbol = resolveReference(reference, this.props.appState.project);
        if (symbol) {
          symbolName = symbol.name;
        }
      }

      const result: IEditorTabViewProps = {
        id: editor.id,
        name: symbolName,
        appState: this.props.appState,
        pvState: pvState,
      }

      return result;
    })
    
    return (
      <div className={'editors-tabs-container container-horizontal'}>
        {tabItems.map((tabItem: IEditorTabViewProps)=>{
          return (
            <EditorTabView key={tabItem.id} data={tabItem} />
          )
        })}
        <div className={'editors-tabs-container-fill-space'} />
      </div>
    )
  }
}
