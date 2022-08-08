import { combineReducers } from 'redux';
import fetchResourceReducer from './fetchResourceReducer';
import fetchUserReducer from './fetchUsersReducer';

const allReducers = combineReducers({
    allUsers: fetchUserReducer,
    allResources: fetchResourceReducer
})

export default allReducers