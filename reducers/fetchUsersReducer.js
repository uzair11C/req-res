import * as actions from '../actions/types'

const initialState = {
    users: []
}

export const fetchUsersReducer = (state = initialState, action) =>
{
    switch(action.type)
    {
        case actions.FETCH_USERS:
            return{
                ...state,
                users: action.payload
            };
        
        default:
            return{
                state
            }
    }
}

export default fetchUsersReducer