import * as React from 'react';
import './Node.css';
import { appConfig } from '../../config/appConfig';
import Rnd from 'react-rnd';
import { v4 } from 'node-uuid';
import { ViewBase } from '../View';

interface INodeViewProps {
}

interface INodeViewState {
}

export class NodeView extends ViewBase<INodeViewProps, INodeViewState> {

  render() {
    return (
      <div>node</div>
    )
  }
} 
