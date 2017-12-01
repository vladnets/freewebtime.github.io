import * as React from 'react';
import FontAwesome from 'react-fontawesome';
import { CardViewBase } from './CardViewBase';
import { SymbolType, IPrimitive } from '../../../../api/project/ISymbol';

export class PrimitiveCardView extends CardViewBase {
  contentValueView = () => {
    const primitive = this.props.symbol as IPrimitive;
    if (!primitive) {
      return false;
    }

    return (
      <div className="content-container">
      {primitive.defaultValue.toString()}
      </div>
    )
  }
}