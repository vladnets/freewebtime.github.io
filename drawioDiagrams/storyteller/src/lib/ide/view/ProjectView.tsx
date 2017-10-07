import { View } from '../../framework/view/View';
import * as React from 'react';
import { IViewData } from '../../framework/view/IViewData';
import { IAppItem } from '../../framework/appData/IAppItem';

export class ProjectView extends View<IAppItem> {

  render(){

    const subitems = this.props.data.Content;

    return (
      <div>
        <h1>{this.props.data.Name}</h1>
        <ul>
          {(this.props.data.Content || {}).map((item: IAppItem)=> {
            return (
              <View data={item} viewData={this.props.viewData} key={item.Id} />
            );
          })}
        </ul>
      </div>
    );
  } 
}