import { IVector2 } from '../api/IVector2';
import { Store } from 'redux';
import { ViewBase } from './View';
import { IAppResources } from '../api/IAppResources';
import * as React from 'react';
import { IAppState } from '../api/IAppState';
import { Provider } from 'react-redux';
import { ProjectView } from './ProjectView';
import Button from 'material-ui/Button';

export type DiDragCallback = (id: string, deltaPos: {x: number, y: number}, newPosition?: {x: number, y: number})=>void;
export class DraggableItem extends ViewBase<{id?: string, className?: string, position?: {x: number, y: number}, size?: {x: number, y: number}, onDrag?: DiDragCallback, style?: React.CSSProperties}> {
  state = {
    dragging: false,
    dragStart: {x: 0, y: 0}, 
    position: this.props.position || {x: 0, y: 0},
  };
  
  onMouseDown(e: any, context: React.Component) {
    context.setState({
      ...context.state, 
      dragStart: {x: e.pageX, y: e.pageY},
      dragging: true,
    });

    e.stopPropagation()
    e.preventDefault()
  }
  onMouseOut(e: any, context: React.Component) {
    context.setState({
      ...context.state, 
      dragging: false,
    });

    e.stopPropagation()
    e.preventDefault()
  }
  onMouseUp(e: any, context: React.Component) {
    context.setState({
      ...context.state, 
      dragging: false,
    });

    e.stopPropagation()
    e.preventDefault()
  }
  onMouseMove(e: any, context: React.Component) {
    if (!context.state[('dragging')]) {
      return;
    }

    const deltaPos = {
      x: (e.pageX - context.state[('dragStart')].x),
      y: (e.pageY - context.state[('dragStart')].y)
    }

    const position = context.state[('position')];
    
    const newPosition = {
      x: position.x + deltaPos.x,
      y: position.y + deltaPos.y,
    };

    context.setState({
      ...context.state, 
      position: newPosition,
      dragStart: {x: e.pageX, y: e.pageY},
    });
    
    e.stopPropagation()
    e.preventDefault()


    const callback = (context.props as any).onDrag;
    const itemId = (context.props as any).id;
    if (callback) {
      callback(itemId, deltaPos, newPosition)
    }
  } 

  render () {
    const position = this.state.position;
    let style = {
      left: position.x, 
      top: position.y, 
    } as React.CSSProperties;
    if (this.props.size) {
      style.width = this.props.size.x;
      style.height = this.props.size.y;
    }
    if (this.props.style) {
      style = {...style, ...this.props.style}
    }
    const className = 'draggable-item ' + this.props.className || '';

    return (
      <div 
        onMouseDown={(e: any) => this.onMouseDown(e, this)}
        onMouseUp={(e: any) => this.onMouseUp(e, this)}
        onMouseMove={(e: any) => this.onMouseMove(e, this)}
        onMouseOut={(e: any) => this.onMouseOut(e, this)}
        style={style}
        className={className}
      >
        {this.props.children}
      </div>
    )
  }
}