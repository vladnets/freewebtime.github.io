import { IProjectViewState } from '../ProjectView';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IAppState } from '../../../api/IAppState';

export interface IEditorTabViewProps {
  appState: IAppState;
  pvState: IProjectViewState;
  id: string;
  name: string;
}

export class EditorTabView extends React.Component<{data: IEditorTabViewProps}> {
  
  handleClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    const pvState = this.props.data.pvState;
    pvState.openEditor(this.props.data.id);
  }

  handleCloseEditor = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    const pvState = this.props.data.pvState;
    pvState.closeEditor(this.props.data.id);
  }

  render () {

    const pvState = this.props.data.pvState;
    const isSelected = this.props.data.id === pvState.activeEditorId;
    const className = isSelected
      ? 'editor-tab-header selected container-horizontal'
      : 'editor-tab-header container-horizontal';

    return (
      <div className={className} onClick={this.handleClick}>
        <FontAwesome name={'file'} className={'editor-tab-header-item icon'} />
        <div className={'editor-tab-header-item text'}>
          {this.props.data.name}
        </div>

        <div onClick={this.handleCloseEditor}>
          <FontAwesome name={'remove'} className={'editor-tab-header-item close-button'} />
        </div>
      </div>
    )
  }
}
