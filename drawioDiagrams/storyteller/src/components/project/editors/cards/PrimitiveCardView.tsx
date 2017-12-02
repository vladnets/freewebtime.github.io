import * as React from 'react';
import { CardViewBase } from './CardViewBase';
import { IPrimitive } from '../../../../api/project/ICard';

export class PrimitiveCardView extends CardViewBase {
  
  headerValueView = (): JSX.Element|boolean => {
    const className = 'card-header-value container-vertical';
    const primitive = this.props.card as IPrimitive;
    
    if (!primitive) {
      return false;
    }
    
    return (
      <div className={className} onClick={this.toggleShowContent}>
        <div>
        {this.props.card.name} ({primitive.primitiveType})
        </div>
      </div>
    )
  }

  contentValueView = () => {
    const className = 'card-content-value container-vertical';
    const primitive = this.props.card as IPrimitive;
    
    if (!primitive) {
      return false;
    }

    const value = primitive.value 
      ? JSON.stringify(primitive.value)
      : '';

    return (
      <div className={className}>
        <div>
        {primitive.value}
        </div>
      </div>
    )
  }
}