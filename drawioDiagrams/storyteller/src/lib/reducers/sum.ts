import { IObject } from '../api/IObject';
import { IAction } from '../api/IAction';

export const sum = function(state: IObject){
  let result = 0;

  if (state) {
    const operands = state[('Operands')];
    if (Array.isArray(operands)) {
      operands.map(operand=>result += operand);
    }
  }

  return result;
}