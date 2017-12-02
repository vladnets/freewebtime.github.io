import { SymbolViewBase } from './SymbolViewBase';
import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { IPrimitiveOld } from '../../../../api/project/ISymbol';
import { CardSocketView, CardSocketType } from './CardSocketView';

export class PrimitiveSymbolView extends SymbolViewBase {
  contentValueView = () => {
    const primitive = this.props.symbol as IPrimitiveOld;
    if (primitive) {
      return (
        <div className="content-container">
          {primitive.defaultValue.toString()}
        </div>
      )
    }

    return false;
  }

  contentInputView = (): any => {
    return (
      <div className="input-container">
        <CardSocketView socketType={CardSocketType.Input} symbol={this.props.symbol} cardboardId={this.props.cardboardId} />
      </div>
    )
  }
  contentOutputView = (): any => {
    return (
      <div className="output-container">
        <CardSocketView socketType={CardSocketType.Output} symbol={this.props.symbol} cardboardId={this.props.cardboardId} />
      </div>
    )
  }
}