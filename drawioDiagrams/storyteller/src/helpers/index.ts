export const foreachFields = (obj: {}, callback: (fieldName: string, index: number, fieldValue: any)=>void) => {
  Object.keys(obj).map((key: string, index: number) => {
    console.log('before call callback', obj, key, index, obj[key]);
    callback(key, index, obj[key]);
  })
}