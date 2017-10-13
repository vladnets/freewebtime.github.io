import * as React from 'react';
import { IAppResources } from '../api/IAppResources';
import { IViewItem } from '../api/IViewItem';

export class View extends React.Component<{data: any, resources: IAppResources, isContainer?: boolean}> {
  render(): any {
    if (!this.props.data) {
      return false;
    }

    if (Array.isArray(this.props.data)) {
      return (this.props.data.map((item, index)=>
        <View data={item} resources={this.props.resources} key={index} />
      ));
    }
    
    const viewItem: IViewItem = this.props.data;

    if (viewItem) {
      if (viewItem.id) {
        const template = this.props.resources.theme['#'+viewItem.id];
        if (template) {
          return template(this.props.data, this.props.resources);
        }
      }
  
      if (viewItem.ClassName) {
        const template = this.props.resources.theme['.'+viewItem.ClassName];
        if (template) {
          return template(this.props.data, this.props.resources);
        }
      }
  
      if (viewItem.ItemType) {
        const template = this.props.resources.theme[viewItem.ItemType];
        if (template) {
          return template(this.props.data, this.props.resources);
        }
      }

      if (viewItem.Content) {
        if (Array.isArray(viewItem.Content)) {
          if (this.props.isContainer) {
            return (
              <div className={'container ' + viewItem.ClassName} id={viewItem.id}> 
                {viewItem.Content.map((item, index)=> <View data={item} resources={this.props.resources} key={index} />)}
              </div>
            );
          }
          
          return (viewItem.Content.map((item, index)=>
            <View data={item} resources={this.props.resources} key={index} />
          ));
        }
      }
    }

    return (<div className={'no-template itemtype:' + viewItem.ItemType + ' className:' + viewItem.ClassName + ' Id:' + viewItem.id}>{JSON.stringify(this.props.data)}</div>)
  }
}