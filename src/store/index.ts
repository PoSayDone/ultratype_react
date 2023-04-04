import {createStore} from "redux";
import {rootReducer} from "./reducers/allReducers";
import {composeWithDevTools} from "redux-devtools-extension";


export const store = createStore(rootReducer , composeWithDevTools())