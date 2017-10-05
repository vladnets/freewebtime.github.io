import state from '../state';
import actions from '../actions';

const reducer = (state={initialState}, action) =>{
    switch (action.type) {
        case actions.Metadata:
        return {...state, fetching: true};
        
        case "FETCH_USERS_FULFILLED":
        return {...state, fetching: false, error: action.payload};
        
        case "FETCH_USERS_REJECTED":
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