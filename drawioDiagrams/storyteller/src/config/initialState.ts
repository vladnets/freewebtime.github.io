import { IAction } from '../api/IAction';
import { IApp } from '../api/IApp';
import { NodeType } from '../api/NodeType';

export const initialState: IApp = {
  resources: {
    theme: {},
    callback: (action: IAction)=>{console.log('action: ', action);},
  },
  data: {
    project: {
      name: 'Example story',
      graph: {
        root: {
          type: NodeType.Object,
          name: 'root',
          size: {x: 250, y: 180},
          position: {x: 0, y: 0},
          context: undefined,
          input: {},
          value: {},
          content: {},
        }
      }
    }   
  },
}