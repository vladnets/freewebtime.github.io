
export interface IGenericAction<TPayload> {
  type: string;
  payload: TPayload
}

export interface IAction extends IGenericAction<any|undefined> {
}

export type ICrudAction<TItem> = IGenericAction<{item: TItem}>;
