import { IAction } from '../api/IAction';
import { INode } from '../api/INode';

export const nodeReducer = function(state: INode|undefined, action: IAction, context?: INode|undefined) {

  if (!state) {
    return state;
  }

  const execContext = {...state.input, ...state.locals, ...context};
  let execResult: any;
  
  if (!state.value) {
    if (state.reference) {
      //get referenced node
      execResult = nodeReducer(execContext[state.reference], action, context);
    }
  }
  else {

    if (typeof state.value === 'object') {
      execResult = {};
      
      for (let subnodeId in state.value) {
        if (state.value.hasOwnProperty(subnodeId)) {
          
          let subnode = state.value[subnodeId] as INode;
          if (subnode) {
            execResult[subnodeId] = nodeReducer(subnode, action, execContext);
          }
    
          else {
            execResult[subnodeId] = subnode;
          }
        }
      }
    }

    else {
      return state.value;
    }
  }

  const resultNode = {...state, value: execResult};
  
  return resultNode;
}