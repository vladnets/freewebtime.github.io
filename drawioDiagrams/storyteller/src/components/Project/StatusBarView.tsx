import { IGraphNode } from '../../api/graph/IGraph';
import { IProjectOld } from '../../api/project/IProject';
import { ViewBase } from '../View';
import * as React from 'react';
import { getSelectedNode } from '../../helpers/index';

export class StatusBarView extends ViewBase<{data: IProjectOld}> {
  render() {

    const project = this.props.data;
    const selectedNode = getSelectedNode(project); 
    const statusText = 
      'selected: ' + 
      (selectedNode
        ? selectedNode.name
        : 'none'
      );

    return (
      <div className={'status-bar-view'}>
        {statusText}
      </div>
    );
  }
} 
