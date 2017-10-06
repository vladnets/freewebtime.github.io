import { IGraphItem } from '../state/GraphEditor/IGraphItem';
import * as React from 'react';

export class GraphItem extends React.Component<IGraphItem> {

  render() {

    let component;
    const renderer = this.props.Renderers.get(this.props.RenderMode);
    if (renderer && renderer.render)
    {
        component = renderer.render(this.props.Data);
    }

    return (
      <div className="GraphItem" id={'graphItem' + this.props.Id}>
        {component}
      </div>
    );  
  }
}