import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk  from 'redux-thunk';
import allReducers from '../reducers/index';

const initialState = {};

const middleware = [ReduxThunk ];

const store = createStore(
  allReducers,
  initialState,
  compose(
    applyMiddleware(...middleware)
  )
);

export default store;