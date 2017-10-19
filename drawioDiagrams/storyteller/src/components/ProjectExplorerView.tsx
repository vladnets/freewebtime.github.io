import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IProject } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';
import { List, Segment, Icon, Card, Menu } from 'semantic-ui-react';

export class ProjectExplorerView extends React.Component<{data: IProject}, {isExpanded: boolean, selectedItem: string}> {
  state = {
    isExpanded: true,
    selectedItem: '',
  };
  handleItemClick = (e, { name }) => this.setState({...this.state, selectedItem: name });

  render() {
    const className = 'fullheight project-explorer' + (this.state.isExpanded ? ' expanded' : ' collapsed');
    const activeItem = this.state.selectedItem;

    return (
      <Segment color={'black'} className={className}>
        <List divided selection verticalAlign={'middle'}>
        {
          Object.keys(this.props.data.nodes).map((key: string, index: number) => (
            <List.Item size={'small'} key={key} className={'project-explorer-item'} name={key} active={activeItem === key} onClick={this.handleItemClick} >
              <List.Icon name={'file'} /> 
              <List.Content>
                <List.Header>{this.props.data.nodes[key].name}</List.Header>
              </List.Content>
            </List.Item>
          ))
        }
        </List>
      </Segment>
    );
  }
} 