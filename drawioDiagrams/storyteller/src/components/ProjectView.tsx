import { ViewBase } from './View';
import * as React from 'react';

export class ProjectView extends ViewBase<{data: any}> {
  render() {
    console.log(this.props.data);

    return (
      <div>
        Project content!
      </div>
    )
  }
}