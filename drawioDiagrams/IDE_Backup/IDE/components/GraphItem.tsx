import { IGraphItem } from '../state/GraphEditor/IGraphItem';
import * as React from 'react';
import { Renderers } from './Renderers';

export class GraphItem extends React.Component<{data: IGraphItem}> {

  render() {

    let component;
    const renderer = Renderers[this.props.data.RenderMode];
    if (renderer && renderer.render)
    {
        component = renderer.render(this.props.data.Data);
    }

    return (
      <div className="GraphItem" id={'graphItem' + this.props.data.Id}>
        {component}
      </div>
    );  
  }
}