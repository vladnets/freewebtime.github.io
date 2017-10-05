import { IIdeState } from '../state/IIdeState';
import * as React from 'react';
import { NavigationBar } from './NavigationBar';

export class GraphEditorIde extends React.Component<IIdeState> {

  onMenuItemClick(e: any) {
    console.log(e);
  }

  render() {
    let bodyContent: any;
    let ideState = this.props;
    
    if (ideState.Project) {
      bodyContent = (
        <span>
          <div>Project: {ideState.Project.Name}, created {ideState.Project.Created}</div>
        </span>
      )
    } else {
      bodyContent = (
        <span>
          <div>No project loaded</div>
        </span>
      )
    }
    
    return (
      <div className="App">
        <NavigationBar items={ideState.Navbar.items} />
        {bodyContent}
      </div>
    );  
  }
}