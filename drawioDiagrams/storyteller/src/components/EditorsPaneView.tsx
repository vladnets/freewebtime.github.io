import { ICallback } from '../api/index';
import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IAppState, IProject } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';
import { Card, Segment } from 'semantic-ui-react';
import { INode } from '../api/INode';
import * as ReactDom from 'react-dom';
import Draggable from 'react-draggable';
import { appConfig } from '../config/appConfig';
import { NodeGraphView } from './NodeGraphView';

export class EditorsPaneView extends ViewBase<{data: IProject, resources: IAppResources}> {

  render() {
    return (
      <div className={'fullheight fullwidth'} style={{display: 'flex', flexDirection: 'column'}}>
        Editors Pane View
        <NodeGraphView data={this.props.data} resources={this.props.resources}/>
      </div>
    );
  }
} 