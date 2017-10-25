import { IProject } from '../../api/IAppState';
import { ViewBase } from '../View';
import { IAppResources } from '../../api/IAppResources';
import * as React from 'react';
import { IModule } from '../../api/INode';
import { getModuleById } from '../../helpers/index';

export class MainMenuView extends ViewBase<{data: IProject, resources: IAppResources}> {
  render() {
    const projectName = this.props.data.name;
    
    return (
      <div className={'main-menu-view'}>
        <div className={'container-horizontal main-menu-view-container'}>
          <div className={'main-menu-item'}>
            <b>{projectName}</b>
          </div>
          <div className={'main-menu-item'}>
          ({this.props.data.id})
          </div>
        </div>
      </div>
    )
  }
}