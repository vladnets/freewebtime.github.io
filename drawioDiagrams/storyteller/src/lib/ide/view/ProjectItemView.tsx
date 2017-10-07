import { IIde } from '../appData/IIde';
import { IProjectItem } from '../appData/IProjectItem';
import { View } from '../../framework/view/View';
import * as React from 'react';
import { IViewData } from '../../framework/view/IViewData';
import { IProject } from '../appData/IProject';

export class ProjectItemView extends View<IProjectItem> {

  render(){
    return (
      <div>
        <h3>{this.props.data.Name}</h3>
      </div>
    );
  } 
}