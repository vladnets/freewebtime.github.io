import { IAppResources } from '../api/IAppResources';
import { StatusBarView } from './StatusBarView';
import { NodeGraphView } from './NodeGraphView';
import { ViewBase } from './View';
import * as React from 'react';
import { IProject } from '../api/IAppState';
import { ProjectExplorerView } from './ProjectExplorerView';
import { Segment, Menu, Dropdown, Icon } from 'semantic-ui-react';

export class MainMenuView extends ViewBase<{data: IProject, resources: IAppResources}> {
  render() {
    return (
      <Menu size="small">
        <Dropdown item simple text={'Main menu'}>
          <Dropdown.Menu>
            <Dropdown.Item>
              <Icon name="dropdown" />
              <span className="text">New</span>
              <Dropdown.Menu>
                <Dropdown.Item>Document</Dropdown.Item>
                <Dropdown.Item>Image</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>Open</Dropdown.Item>
            <Dropdown.Item>Save...</Dropdown.Item>
            <Dropdown.Item>Edit Permissions</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Export</Dropdown.Header>
            <Dropdown.Item>Share</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Menu.Item header>
          {this.props.data.projectData.name}
        </Menu.Item>

        <Menu.Menu position="right">
          <div className="ui right aligned category search item">
            <div className="ui transparent icon input">
              <input className="prompt" type="text" placeholder="Search..." />
              <i className="search link icon" />
            </div>
            <div className="results" />
          </div>
        </Menu.Menu>
      </Menu> 
    )
  }
}