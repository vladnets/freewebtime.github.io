const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null
};

const reducer = (state={initialState}, action) =>{
    switch (action.type) {
        case "FETCH_TWEETS_PENDING":
        return {...state, fetching: true};
        
        case "FETCH_TWEETS_FULFILLED":
        return {...state, fetching: false, error: action.payload};
        
        case "FETCH_TWEETS_REJECTED":
        return {
            ...state,
            fetching: false,
            fetched: true,
            users: action.payload
        }
    }

    return state;
}

export default reducer;
