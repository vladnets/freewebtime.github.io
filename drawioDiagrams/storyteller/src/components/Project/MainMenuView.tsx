import { ViewBase } from '../View';
import { IProject } from '../../api/IAppState';
import { IAppResources } from '../../api/IAppResources';
import * as React from 'react';

export class MainMenuView extends ViewBase<{data: IProject, resources: IAppResources}> {
  render() {
    return (
      <div className={'main-menu-view'}>
        <div className={'container-horizontal main-menu-view-container'}>
          <div className={'main-menu-item'}>
            Main menu
          </div>
          <div className={'main-menu-item'}>
            {this.props.data.projectData.name}
          </div>
          <div className={'main-menu-item'}>
            {this.props.data.projectData.name}
          </div>
        </div>
      </div>
    )
  }
}