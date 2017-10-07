import { IProjectItem } from '../appData/IProjectItem';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IdeView } from './IdeView';
import { IIde } from '../appData/IIde';
import { IApp } from '../appData/IApp';
import { AppView } from '../view/AppView';
import { IViewData } from '../../framework/view/IViewData';
import { ProjectView } from './ProjectView';
import { IProject } from '../appData/IProject';
import { ProjectItemView } from './ProjectItemView';
import { Theme } from '../../framework/view/Theme';
import { ItemTypes } from '../appData/ItemTypes';

const theme: Theme = new Theme();

theme.addTemplate(undefined, undefined, (data: any = '') => {
  return (
    <div className={'default-renderer'}>
      {data.toString()}
    </div>
  )
});

theme.addTemplate(ItemTypes.ITEM_TYPE_IDE, undefined, (data: IIde, viewData: IViewData) => {
  return (<IdeView data={data} viewData={viewData} key={data.Id} />);
});

theme.addTemplate(ItemTypes.ITEM_TYPE_APP, undefined, (data: IApp, viewData: IViewData) => {
  return (<AppView data={data} viewData={viewData} key={data.Id} />);
});
  
theme.addTemplate(undefined, undefined, (data: IProject, viewData: IViewData) => {
  return (<ProjectView data={data} viewData={viewData} key={data.Id} />);
});
    
theme.addTemplate(undefined, undefined, (data: IProjectItem, viewData: IViewData) => {
  return (<ProjectItemView data={data} viewData={viewData} key={data.Id} />);
});
      
export default theme;