import { IIde } from '../appData/IIde';
import { IProjectItem } from '../appData/IProjectItem';
import { View } from '../../framework/view/View';
import * as React from 'react';
import { IViewData } from '../../framework/view/IViewData';
import { IProject } from '../appData/IProject';

export class ProjectView extends View<IProject> {

  render(){
    return (
      <div>
        <h1>{this.props.data.Name}</h1>
        <ul>
          {
            this.props.data.Items.map((item: IProjectItem)=> {
              return (
                <View data={item} viewData={{...this.props.viewData, itemType: item.ItemType, id: item.Id}} key={item.Id} />
              );
            })
          }
        </ul>
      </div>
    );
  } 
}