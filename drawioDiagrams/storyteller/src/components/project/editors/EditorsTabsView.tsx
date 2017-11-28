import { resolveReference, resolveReferenceFast } from '../../../helpers';
import { IEditorTabViewProps, EditorTabView } from './EditorTabView';
import { IProjectViewState } from '../ProjectView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IAppState } from '../../../api/IAppState';

export class EditorsTabsView extends React.Component<{appState: IAppState, pvState: IProjectViewState}> {
  render () {
    const pvState = this.props.pvState;
    const appState = this.props.appState;

    const tabItems = Object.keys(pvState.opennedEditors).map((editorId: string) => {
      const editor = pvState.opennedEditors[editorId];
      const symbol = resolveReferenceFast(editorId, appState.project);
      let symbolName = 'N/A';
      if (symbol) {
        symbolName = symbol.name;
      }

      const result: IEditorTabViewProps = {
        id: editorId,
        name: symbolName,
        appState: appState,
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
