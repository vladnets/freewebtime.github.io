import * as React from 'react';
import { IAppResources } from '../api/IAppResources';
import { IViewItem } from '../api/IViewItem';

export class ViewBase<TProps> extends React.Component<TProps> {
}

export class View extends ViewBase<{data: any, resources: IAppResources, isContainer?: boolean}> {
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
  
      if (viewItem.className) {
        const template = this.props.resources.theme['.'+viewItem.className];
        if (template) {
          return template(this.props.data, this.props.resources);
        }
      }
  
      if (viewItem.itemType) {
        const template = this.props.resources.theme[viewItem.itemType];
        if (template) {
          return template(this.props.data, this.props.resources);
        }
      }

      if (viewItem.content) {
        if (Array.isArray(viewItem.content)) {
          if (this.props.isContainer) {
            return (
              <div className={'container ' + viewItem.className} id={viewItem.id}> 
                {viewItem.content.map((item, index)=> <View data={item} resources={this.props.resources} key={index} />)}
              </div>
            );
          }
          
          return (viewItem.content.map((item, index)=>
            <View data={item} resources={this.props.resources} key={index} />
          ));
        }
      }
    }

    return (<div className={'no-template itemtype:' + viewItem.itemType + ' className:' + viewItem.className + ' Id:' + viewItem.id}>{JSON.stringify(this.props.data)}</div>)
  }
}