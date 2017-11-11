import { getSelectedNode } from '../../helpers';
import { GraphView } from '../Graph/GraphView';
import { ViewBase } from '../View';
import { IAppResources } from '../../api/IAppResources';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IProjectOld } from '../../api/project/IProject';
import { IHash } from '../../api/IHash';
import { ISocketsData } from '../../api/IAppState';

export class EditorsPaneView extends ViewBase<{project: IProjectOld, resources: IAppResources}> {

  render() {
    const nodeStyle = {
      width: '120px', 
      height: '80px', 
      background: 'maroon', 
      color: 'white',
      position: 'absolute',
      top: '120px',
      left: '-80px',
    } as React.CSSProperties;
    
    const selectedNode = getSelectedNode(this.props.project);
    if (!selectedNode) {
       return false;
    }

    return (
      <div className={'fullheight fullwidth'} style={{display: 'flex', flexDirection: 'column'}}>
        <GraphView 
          project={this.props.project} 
          rootNode={selectedNode} 
          resources={this.props.resources}
        />
      </div>
    );
  }
} 