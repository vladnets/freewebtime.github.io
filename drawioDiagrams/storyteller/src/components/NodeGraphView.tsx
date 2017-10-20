import { NodeView } from './NodeView';
import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IAppState, IProject } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';
import { Segment } from 'semantic-ui-react';

export class NodeGraphView extends ViewBase<{data: IProject}> {
  render() {
    const className = 'fullheight node-graph-view'

    return (
      <Segment className={className} >
      {
        Object.keys(this.props.data.nodes).map((key: string, index: number) => (
          <NodeView key={key} data={this.props.data} node={this.props.data.nodes[key]}/>
        ))          
      }
      </Segment>
    );
  }
} 