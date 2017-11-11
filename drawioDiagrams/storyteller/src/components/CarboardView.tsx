import { IAppState } from '../api/IAppState';
import * as React from 'react';
import { IHash } from '../api/IHash';
import FontAwesome from 'react-fontawesome';

export class CardboardView extends React.Component<{appState: IAppState}> {
  render () {
    return (
      <div className={'cardboard-container container-vertical'}>
        <div className="cardboard-header">
          Cardboard header
        </div>
        <div className="cardboard-content">
          Cardboard content
        </div>
      </div>
    )
  }
}