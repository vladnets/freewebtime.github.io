import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { CardboardView } from './CarboardView';

export class EditorsContainerView extends React.Component<{appState: any}> {
  render () {
    return (
      <div className={'editors-container container-vertical'} >
        <div className={'editors-tabs-container container-horizontal'}>
          <div className={'editor-tab-header container-horizontal'}>
            <FontAwesome name={'file'} className={'editor-tab-header-item icon'} />
            <div className={'editor-tab-header-item text'}>
              character
            </div>
            <FontAwesome name={'remove'} className={'editor-tab-header-item close-button'} />
          </div>
          <div className={'editor-tab-header selected container-horizontal'}>
            <FontAwesome name={'file'} className={'editor-tab-header-item icon'} />
            <div className={'editor-tab-header-item text'}>
              storypoint
            </div>
            <FontAwesome name={'remove'} className={'editor-tab-header-item close-button'} />
          </div>
          <div className={'editor-tab-header container-horizontal'}>
            <FontAwesome name={'file'} className={'editor-tab-header-item icon'} />
            <div className={'editor-tab-header-item text'}>
              location
            </div>
            <FontAwesome name={'remove'} className={'editor-tab-header-item close-button'} />
          </div>
          <div className={'editor-tab-header container-horizontal'}>
            <FontAwesome name={'file'} className={'editor-tab-header-item icon'} />
            <div className={'editor-tab-header-item text'}>
              system
            </div>
            <FontAwesome name={'remove'} className={'editor-tab-header-item close-button'} />
          </div>
          <div className={'editors-tabs-container-fill-space'} />
        </div>

        <div className={'editor-root container-vertical'}>
          <CardboardView appState={this.props.appState}/>
        </div>
      </div>
    )
  }
}