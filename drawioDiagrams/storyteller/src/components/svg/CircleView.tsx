import * as React from 'react';
import { IVector2 } from '../../api/IVector2';
import { NColor } from '../../api/Color';
import { appConfig } from '../../config/appConfig';
import { colorToRgbaString } from '../../helpers/index';

export interface ICircleProps {
  className?: string;
  style?: any;
  center: IVector2;
  radius: number;
  strokeColor?: NColor;
  fillColor?: NColor;
  strokeSize?: number;
  isDrawSvgContainer?: boolean;
}
export class CircleView extends React.Component<ICircleProps> {

  graphics = (className: string, style: any) => {
    const center = this.props.center;
    const radius = this.props.radius;
    const strokeWidth = this.props.strokeSize || 0;

    const fillColor = this.props.fillColor 
      ? colorToRgbaString(this.props.fillColor) 
      : colorToRgbaString(appConfig.Colors.Transparent) 
    ;

    const strokeColor = this.props.strokeColor 
      ? colorToRgbaString(this.props.strokeColor) 
      : colorToRgbaString(appConfig.Colors.Transparent) 
    ;

    return (
      <g className={className} style={style}>
        <circle cx={center.x} cy={center.y} r={radius} fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} />
      </g>
    )
  }

  render () {
    const className = this.props.className || '';
    const style = this.props.style || {};

    return (this.props.isDrawSvgContainer === true) 
      ? (
          <svg className={className} style={style}>
          {this.graphics('', {})}
          </svg>
        )
      : this.graphics(className, style)
    ;
  }
}