import * as React from 'react';
import { IGraph } from '../state/GraphEditor/IGraph';
import { GraphItem } from './GraphItem';

export class GraphEditor extends React.Component<IGraph> {

  render() {
    return (
      <div className="GraphEditor">
        {Array.from(this.props.GraphItems.values()).map(graphItem => (
            <GraphItem 
                Data={graphItem.Data}
                Id={graphItem.Id}
                Renderers={this.props.Renderers}
                RenderMode={graphItem.RenderMode}
            />
        ))}      
      </div>
    );  
  }
}