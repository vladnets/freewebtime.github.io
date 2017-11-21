import * as React from 'react';
import { IProjectViewState } from './ProjectView';

export class ObjectPropertiesView extends React.Component<{appState: any, pvState: IProjectViewState}> {
  render() {
    return (
      <div className={'object-properties-container container-vertical'}>
        <div className={'object-properties-header'}>
          PROPERTIES
        </div>
        <div className={'object-properties-content'}>
          Object properties
        </div>  
      </div>      
    );
  }
}




