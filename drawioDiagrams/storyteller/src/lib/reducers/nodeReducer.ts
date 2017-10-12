import { IAction } from '../api/IAction';
import { INode } from '../api/INode';

export const nodeReducer = function(state: INode|undefined, action: IAction, context?: INode|undefined) {

  if (!state) {
    return state;
  }

  const execContext = {...state.input, ...state.locals, ...context};
  let execResult: any;
  
  if (typeof state.function === 'function') {
    execResult = state.function(state, action, context);
  }
  else if (state.reference) {
    //get referenced node
    execResult = getNodeValue(state.reference)(action, context);
  }
  else if (state.output) {
    execResult = {};
    for (var outputName in state.output) {
      if (state.output.hasOwnProperty(outputName)) {
        var outputValue = state.output[outputName];
        
        execResult[outputName] = nodeReducer(outputValue, action, execContext);
      }
    }
  }
  else if (state.value) {
    execResult = state.value;
  }
  else {
    execResult = state.default_value;
  }

  const resultNode = {...state, value: execResult};
  return resultNode;
}

export const getNodeValue = function(path: string) {
  return function(action: IAction, context: any) {
    if (!context) {
      return context;
    }
  
    const result = nodeReducer(context[path], action, context);
    if (result) {
      return result.value;
    }

    return undefined;
  }
}