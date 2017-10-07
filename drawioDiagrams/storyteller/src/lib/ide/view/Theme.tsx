import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IdeView } from './IdeView';
import { IIde } from '../appData/IIde';
import { IApp } from '../appData/IApp';
import { AppView } from '../view/AppView';
import { IViewData } from '../../framework/view/IViewData';
import { ProjectView } from './ProjectView';
import { IProject } from '../appData/IProject';

let styles = {}

styles[('default-style')] = {}
styles[('default-style')][('default')] = (data: any) => {
  return (
    <div className={'default-renderer'}>
      {(data || {}).toString()}
    </div>
  )
}

styles[('ide')] = {}
styles[('ide')][('default')] = (data: IIde, viewData: IViewData) => {
  return (<IdeView data={data} viewData={viewData} key={viewData.id} />);
}

styles[('app')] = {}
styles[('app')][('default')] = (data: IApp, viewData: IViewData) => {
  return (<AppView data={data} viewData={viewData} key={viewData.id} />);
}

styles[('project')] = {}
styles[('project')][('default')] = (data: IProject, viewData: IViewData) => {
  return (<ProjectView data={data} viewData={viewData} key={viewData.id} />);
}

export default styles;