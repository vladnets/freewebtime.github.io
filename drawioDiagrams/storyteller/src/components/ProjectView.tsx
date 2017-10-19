import { StatusBarView } from './StatusBarView';
import { NodeGraphView } from './NodeGraphView';
import { ViewBase } from './View';
import * as React from 'react';
import { IProject } from '../api/IAppState';
import { ProjectExplorerView } from './ProjectExplorerView';
import { Segment, Menu, Dropdown, Icon } from 'semantic-ui-react';

export class ProjectView extends ViewBase<{data: IProject}> {
  render() {
    return (
      <div className={'project-view'}>
        <div className={'main-menu container-vertical fullheight'}>
          <Segment style={{padding:'0pt'}}>
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
          </Segment>

          <div className={'container-horizontal fullheight'}>
            <ProjectExplorerView data={this.props.data}/>
            <NodeGraphView data={this.props.data}/>
          </div>

          <StatusBarView data={this.props.data}/>
        </div>
      </div>
    )
  }
}