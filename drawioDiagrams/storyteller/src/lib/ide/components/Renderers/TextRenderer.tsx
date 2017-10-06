import * as React from 'react';

export class TextRenderer extends React.Component<{text:any}> {

  render() {
    return (
      <div className="TextRenderer">
        {this.props.text}
      </div>
    );  
  }
}