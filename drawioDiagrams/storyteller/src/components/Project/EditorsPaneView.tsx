import { getModuleById } from '../../helpers/index';
import { IProject } from '../../api/IAppState';
import { GraphView } from '../Graph/GraphView';
import { ViewBase } from '../View';
import { IAppResources } from '../../api/IAppResources';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IModule } from '../../api/INode';

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
    
    const selectedModule = getModuleById(this.props.data.selectedModuleId, this.props.data);
    if (!selectedModule) {
      return false;
    }

    return (
      <div className={'fullheight fullwidth'} style={{display: 'flex', flexDirection: 'column'}}>
        <GraphView data={selectedModule} project={this.props.data} resources={this.props.resources}/>
      </div>
    );
  }
} 