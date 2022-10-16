import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import postReducer from "./post-reducer";

let reducers = combineReducers({
    postPage: postReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store;