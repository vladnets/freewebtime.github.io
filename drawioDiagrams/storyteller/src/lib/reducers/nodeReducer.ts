import { IAction } from '../api/IAction';
import { INode } from '../api/INode';
import { appConfig } from '../config/appConfig';

export const nodeReducer = function(node: INode|undefined, action: IAction): any|undefined {

  if (node && action.type === appConfig.ActionTypes.NODE_CALC_VALUE) {
    const parentNode: INode|undefined = action.payload;

    if (node.reference && parentNode) {
      let newValue: any|undefined = undefined;

      if (parentNode.locals && parentNode.locals[node.reference]) {
        newValue = parentNode.locals[node.reference];
      }
      else if (parentNode.input && typeof parentNode.input === 'object') {
        let targetNode = parentNode.input[node.reference] as INode;
        if (!targetNode) {
          newValue = parentNode.input[node.reference];
        }
        else {
          newValue = targetNode.value;
        }
      }
      
      return {...node, value: newValue}
    }
    if (typeof node.function === 'function') {
      return {...node, value: node.function(node, action)};
    }
    if (node.output && typeof node.output === 'object') {
      return nodeReducer(node, {type: appConfig.ActionTypes.NODE_CALC_OUTPUT});
    }
    if (!node.value && node.default_value) {
      return {...node, value: node.default_value};
    }

    return node;
  }

  if (node && node.output && action.type === appConfig.ActionTypes.NODE_CALC_OUTPUT) {

    const newOutput = {};
    for (let outputItemName in node.output) {
      if (!node.output.hasOwnProperty(outputItemName)) {
        continue;
      }

      newOutput[outputItemName] = nodeReducer(node.output[outputItemName], {type: appConfig.ActionTypes.NODE_CALC_VALUE, payload: node});
    }

    return {...node, output: newOutput};
  }

  return node;
}

export const updateOutput = function(node: INode, action: IAction, parent: INode) {
  if (!node || !node.output) {
    return;
  }

  const newOutput = {...node.output}

  for (let outputItemName in newOutput) {
    if (!newOutput.hasOwnProperty(outputItemName)) {
      continue;
    }

    var oldOutputItem = newOutput[outputItemName];
    var oldOutputItemNode = oldOutputItem as INode;
    if (oldOutputItemNode) {
      updateNode(oldOutputItemNode, action, node);
    }
  }

  return {...node, output: newOutput}
}

export const updateNode = function(node: INode, action: IAction, parent: INode) {

}