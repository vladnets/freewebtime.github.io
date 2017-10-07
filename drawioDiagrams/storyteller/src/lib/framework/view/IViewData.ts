export interface IViewData<TData extends any> {
  styleName?: string,
  id?: string,
  displayMode?: string,
  data?: TData,
  template?: any
}