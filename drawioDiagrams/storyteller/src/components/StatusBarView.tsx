import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IAppState, IProject } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';
import { Segment } from 'semantic-ui-react';

export class StatusBarView extends ViewBase<{data: IProject}> {
  render() {
    return (
      <Segment>
        Application status...
      </Segment>
    );
  }
} 