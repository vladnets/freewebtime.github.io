import { IIde } from '../appData/IIde';
import { View } from '../../framework/view/View';
import * as React from 'react';
import { IViewData } from '../../framework/view/IViewData';
import { ProjectView } from './ProjectView';
import * as Actions from '../actions'

export class IdeView extends View<IIde> {

  createProject(){
    let projectTemplates = {
      story: {
        Items: [
        ]
      }
    }
    this.props.viewData.callback(Actions.projectCreate({templateName: 'story', name: 'Amazing story project', templates: projectTemplates}));
  }

  render(){
    if (this.props.data) {
      if (this.props.data.Project) {
        return (
          <div className={'IdeView'}>
            <View data={this.props.data.Project} viewData={this.props.viewData} />
          </div>
        );
      }
  
      return (
        <button 
          onClick={()=> { this.createProject() }} 
        >
          Load project
        </button>
      )
    }

    return (<div>no data to display</div>);
  }
}