import { } from 'material-ui/Card/Card';
import { } from 'material-ui/Menu';
import { View } from '../view/View';
import * as React from 'react';
import { IApp } from '../api/IApp';
import { Dropdown, Icon, Menu, Segment, Card, Image } from 'semantic-ui-react';

export class AppView extends React.Component<{app: IApp}> {
  render(): any {
    
    let a = !true;
    if (!a) {
      return (
        <div className={'app-container'}>
          <div className={'app-header'}>
            <Menu attached={'top'} pointing>
              <Dropdown item icon={'wrench'} simple>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Icon name={'dropdown'} />
                    <span className={'text'}>New</span>

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

              <Menu.Menu position={'right'}>
                <div className={'ui right aligned category search item'}>
                  <div className={'ui transparent icon input'}>
                    <input className={'prompt'} type={'text'} placeholder={'Search animals...'} />
                    <i className={'search link icon'} />
                  </div>
                  <div className={'results'} />
                </div>
              </Menu.Menu>
            </Menu>
          </div>
          <div className={'app-content'} >
            <div className={'app-sidebar sidebar-left expanded'}>left sidebar</div>
            <div className={'app-content'}>
              Center content
              <Card color={'red'} className={'cardclass'}>
                <Image src={'https://react.semantic-ui.com/assets/images/avatar/large/matthew.png'} />
                <Card.Content>
                  <Card.Header>
                    Matthew
                  </Card.Header>
                  <Card.Meta>
                    <span className={'date'}>
                      Joined in 2015
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    Matthew is a musician living in Nashville.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <a>
                    <Icon name={'user'} />
                    22 Friends
                  </a>
                </Card.Content>
              </Card>
            </div>
            <div className={'app-sidebar sidebar-right collapsed'}>right sidebar</div>
          </div>
          <div className={'app-footer'}>Footer</div>
        </div>
      );
    }

    return (
      <div className={'fullheight'} id={'app'}>
        <Segment attached={'bottom'} className={'fullheight'}>
                    {'and here is some text, so...'}
          
          <div className={'fullheight dark'} >
            <View data={this.props.app.data} resources={this.props.app.resources} />
          </div>
          </Segment>
      </div>
    );
  }
}
