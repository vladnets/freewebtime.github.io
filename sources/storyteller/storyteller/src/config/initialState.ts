import { IAction } from '../api/IAction';
import { IApp } from '../api/IApp';

export const initialState: IApp = {
  resources: {
    theme: {},
    callback: (action: IAction)=>{console.log('action: ', action);},
  },
  data: {
    project: {
      name: 'Example story',
      graph: {
        nodes: {
          
        }
      }
    }   
  },
}