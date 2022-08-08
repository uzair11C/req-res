import * as actions from '../actions/types'

const initialState = {
    resources: []
}

function fetchResourceReducer(state = initialState, action) 
{
    switch(action.type)
    {
        case actions.FETCH_RESOURCES:
            return{
                ...state,
                resources: action.payload
            };
        
        default:
            return{
                state
            }
    }
}

export default fetchResourceReducer