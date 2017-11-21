import * as React from 'react';

export default class SvgComponent extends React.Component {
  render() {
    return <svg style={{position:'absolute', width: '100%', height: '100%'}} {...this.props} ref="svg">{this.props.children}</svg>;
  }
} 