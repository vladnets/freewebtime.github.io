import * as React from 'react';
import './Template.css';
import './Cardboard.css';
import { ProjectView } from './project/ProjectView';

export class RootView extends React.Component<{appState: any}> {
  render() {
    return (
      <div className={'app-content'}>
        <ProjectView appState={this.props.appState} />
      </div>
    );
  }
} 
