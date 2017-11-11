import { IHash } from '../api/IHash';
import { IGraphNode } from '../api/graph/IGraph';
import { IAction } from '../api/IAction';
import { graphNodeReducer } from './graphNodeReducer';

export const graphNodesReducer = (state: IHash<IGraphNode> = {}, action: IAction) => {
  switch (action.type) {
    default:
    {
      let isChanged = false;
      const newValues = {}
      Object.keys(state).map((key: string, index: number)=>{
        const oldValue = state[key];
        if (oldValue) {
          const newValue = graphNodeReducer(oldValue, action);
          if (oldValue !== newValue) {
            newValues[key] = newValue;
            isChanged = true;
          }
        }
      });

      if (isChanged) {
        state = {...state, ...newValues}
      }
    }
    break;
  }
  
  return state;
}