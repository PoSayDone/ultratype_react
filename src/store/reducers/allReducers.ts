import {combineReducers} from "redux";
import {languageReducer} from "./languageReducer";
import {fontReducer} from "./fontReducer";


export const rootReducer = combineReducers({
	language: languageReducer,
	font: fontReducer,
})

export type RootState = ReturnType<typeof rootReducer>