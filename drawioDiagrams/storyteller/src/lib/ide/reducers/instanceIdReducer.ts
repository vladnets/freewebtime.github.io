import * as ActionTypes from '../actions/actionTypes';
import ProjectReducer from './projectReducer';
import { CreateGuid } from '../../CreateGuid';

export default function (state: string, action: { type: string }) {
  return state || CreateGuid();
}