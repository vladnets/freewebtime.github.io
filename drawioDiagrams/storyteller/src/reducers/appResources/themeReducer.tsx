import { IAppResources } from '../../api/IAppResources';
import { IAction } from '../../api/IAction';
import { View } from '../../view/View';
import * as React from 'react';
import { ITheme } from '../../api/index';

export const themeReducer = function(state: ITheme, action: IAction) {
  
  if (!state) {
    state = {};

    state[('appRoot')] = (data: any, resources: IAppResources) => { 
      return (<div className={'app'}><View data={data.Content} resources={resources} /></div>) 
    }
    
    state[('ideRoot')] = (data: any, resources: IAppResources) => { 
      return (<div className={'ide'}><View data={data.Content} resources={resources} /></div>) 
    }
  }

  return state;
}