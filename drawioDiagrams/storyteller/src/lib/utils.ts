import { createGuid } from './createGuid';

export const Utils = {
  createGuid: createGuid,
  foreachFields: function<TContext>(obj: any, context: TContext, callback: (fieldName: string, fieldValue: any, context: TContext) => void) {
    if (!obj) {
      return;
    }
  
    for (var fieldName in obj) {
      // skip loop if the property is from prototype
      if (!obj.hasOwnProperty(fieldName)) {
        continue;
      }
  
      const fieldValue = obj[fieldName];
      callback(fieldName, fieldValue, context);
    }
  }
}