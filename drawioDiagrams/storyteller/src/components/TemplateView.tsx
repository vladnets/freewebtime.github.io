import { IAppState } from '../api/IAppState';
import * as React from 'react';
import { IHash } from '../api/IHash';

export class TemplateView extends React.Component<{data: IAppState}> {
  render() {
    return (
      <div className={'app-content'}>
        <div className={'project-view'}>
          <div className={'project-content'}>
            Project content
          </div>
        </div>
      </div>
    );
  }
} 