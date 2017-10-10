import { createGuid } from './createGuid';

export const Utils = {
  createGuid: createGuid,
  ForeachFields: function<TContext>(obj: any, context: TContext, callback: (fieldName: string, field: any, context: TContext) => void) {
    if (!obj) {
      return;
    }
  
    for (var fieldName in obj) {
      // skip loop if the property is from prototype
      if (!obj.hasOwnProperty(fieldName)) {
        continue;
      }
  
      const field = obj[fieldName];
      callback(fieldName, field, context);
    }
  }
}