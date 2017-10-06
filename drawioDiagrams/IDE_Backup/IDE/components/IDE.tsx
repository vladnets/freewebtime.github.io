import * as React from 'react';
import { NavigationBar } from './NavigationBar';
import { Renderers } from './Renderers'

export class IDE extends React.Component<{data: IIdeState}> {

  render() {
    let bodyContent: any;
    let data = this.props.data;

    if (data.Project) {
      let renderMode = data.Project.RenderMode;
      let renderer = Renderers[renderMode];
      if (renderer)
      {
        bodyContent = renderer(data.Project);
      }
      else{
        bodyContent = (
          <span>
            <div>Project: {data.Project.Name}, created {data.Project.Created}</div>
          </span>
        )
      }

    } else {
      bodyContent = (
        <span>
          <div>No project loaded</div>
        </span>
      )
    }
    
    console.log(this.props.data.Navbar);

    return (
      <div className="ideRoot">
        <NavigationBar data={this.props.data.Navbar} />
        {bodyContent}
      </div>
    );  
  }
}