import { IPrimitive, ObjectType, IStructure, IFunction, IObject } from '../api/project/IObject';

export const validateObject = (obj: IObject) => {
  if (!obj.name || obj.name === '') {
    obj.name = obj.id;
  }
  
  if (obj.namespace) {
    obj.fullId = `${obj.namespace}.${obj.id}`;
  }
}

export const createPrimitive = (values: {}) => {
  const result = <IPrimitive> {
    ...values,
    objectType: ObjectType.Primitive,
  }

  validateObject(result);

  return result;
}

export const createStructure = (values: {}) => {
  const result = <IStructure> {
    ...values,
    objectType: ObjectType.Structure,
  }

  validateObject(result);

  return result;
}

export const createFunction = (values: {}) => {
  const result = <IFunction> {
    ...values,
    objectType: ObjectType.Function,
  }

  validateObject(result);
  
  return result;
}
