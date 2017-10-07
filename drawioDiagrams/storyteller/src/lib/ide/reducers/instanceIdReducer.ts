import * as ActionTypes from '../actions/actionTypes';
import { CreateGuid } from '../../CreateGuid';

export default function (state: string, action: { type: string }) {
  return state || CreateGuid();
}