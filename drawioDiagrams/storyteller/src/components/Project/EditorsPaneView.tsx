import { GraphView } from '../Graph/GraphView';
import { ViewBase } from '../View';
import { IProject } from '../../api/IAppState';
import { IAppResources } from '../../api/IAppResources';
import * as React from 'react';
import * as ReactDom from 'react-dom';

export class EditorsPaneView extends ViewBase<{data: IProject, resources: IAppResources}> {

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
    
    return (
      <div className={'fullheight fullwidth'} style={{display: 'flex', flexDirection: 'column'}}>
        <GraphView data={this.props.data} resources={this.props.resources}/>
      </div>
    );
  }
} 