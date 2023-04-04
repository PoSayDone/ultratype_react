import { combineReducers } from "redux";
import { languageReducer } from "./languageReducer";
import { fontReducer } from "./fontReducer";
import { themeReducer } from "./themeReducer";
import {inputReducer} from "./inputReducer";

export const rootReducer = combineReducers({
    theme: themeReducer,
    language: languageReducer,
    font: fontReducer,
    input: inputReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
