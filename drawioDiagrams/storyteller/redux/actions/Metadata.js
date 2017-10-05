export const ActionTypes = {
    MD_ADD_TYPE: "MD_ADD_TYPE",
    MD_REMOVE_TYPE: "MD_REMOVE_TYPE"
}

export const mdAddType = (newType) => {
    return {
      type: ActionTypes.MD_ADD_TYPE,
      payload: newType
    }
}

export const mdRemoveType = (newType) => {
    return {
      type: ActionTypes.MD_REMOVE_TYPE,
      payload: newType
    }
}
  