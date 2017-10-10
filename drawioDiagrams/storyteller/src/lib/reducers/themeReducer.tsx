import * as React from 'react';
import { IViewContext } from '../api/IVIewContext';
import { View } from '../components/View';
import { IObject } from '../api/IObject';
import { IAction } from '../api/IAction';

export const themeReducer = function(state: any, action: IAction) {
  
  state = {
    'appRoot': (data: any, viewContext: IViewContext) => { 
      return (<div className={'app'}><View data={data.Content} viewContext={viewContext} /></div>) 
    },
    'ideRoot': (data: any, viewContext: IViewContext) => { 
      return (<div className={'ide'}><View data={data.Content} viewContext={viewContext} /></div>) 
    },
  }

  return state;
}