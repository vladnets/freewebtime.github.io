import { IAppResources } from '../../api/IAppResources';
import * as React from 'react';
import { ITheme } from '../../api/index';
import { IAction } from '../../api/actions/IAction';
import { View } from '../../components/View';

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