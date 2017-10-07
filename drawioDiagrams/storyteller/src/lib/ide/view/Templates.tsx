import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IdeView } from './IdeView';

const templates = {}

templates[('default-template')] = (data: any) => {
  return (<div className={'default-renderer'}>{(data || {}).toString()}</div>)
}

templates[('ide')] = (data: any) => {
  return (<IdeView data={data}/>)
}

export const Templates = {
  Templates: templates
}