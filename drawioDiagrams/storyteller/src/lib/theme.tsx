import { View } from './View';
import * as React from 'react';
import { IViewContext } from './IViewData';

const theme = {
  'appRoot': (data: any, viewContext: IViewContext) => { 
    return (<div className={'app'}><View data={data.Content} viewContext={viewContext} /></div>) 
  },
  'ideRoot': (data: any, viewContext: IViewContext) => { 
    return (<div className={'ide'}><View data={data.Content} viewContext={viewContext} /></div>) 
  },
}

export default theme;