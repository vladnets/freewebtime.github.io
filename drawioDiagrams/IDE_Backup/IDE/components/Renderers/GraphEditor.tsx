import * as React from 'react';
import { IGraph } from '../../state/GraphEditor/IGraph';
import { GraphItem } from '../GraphItem';

export class GraphEditor extends React.Component<{data:IGraph}> {

  render() {
    return (
      <div className="GraphEditor">
        {Array.from(this.props.data.GraphItems.values()).map(graphItem => (
            <GraphItem data={graphItem} />
        ))}      
      </div>
    );  
  }
}