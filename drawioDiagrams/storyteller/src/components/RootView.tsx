import * as React from 'react';
import './Template.css';
import { ProjectView } from './ProjectView';

export class RootView extends React.Component<{appState: any}> {
  render() {
    return (
      <div className={'app-content'}>
        <ProjectView appState={this.props.appState} />
      </div>
    );
  }
} 
