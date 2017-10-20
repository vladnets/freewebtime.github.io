import { NodeView } from './NodeView';
import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IAppState, IProject } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';
import { Segment } from 'semantic-ui-react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

export class NodeGraphView extends ViewBase<{data: IProject, resources: IAppResources}> {
  render() {
    const className = 'fullheight node-graph-view'

    return (
      <div>
        <ContextMenuTrigger id="graphContextMenu">
          <Segment className={className} >
          {
            Object.keys(this.props.data.nodes).map((key: string, index: number) => (
              <NodeView key={key} data={this.props.data} node={this.props.data.nodes[key]} resources={this.props.resources}/>
            ))          
          }
          </Segment>
        </ContextMenuTrigger>

        <ContextMenu id="graphContextMenu">
          <MenuItem>
            Context menu item 1
          </MenuItem>
          <MenuItem>
            Context menu item 1
          </MenuItem>
          <MenuItem>
            Context menu item 1
          </MenuItem>
        </ContextMenu>
      </div>
    );
  }
} 