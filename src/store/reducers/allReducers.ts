import { combineReducers } from "redux";
import { languageReducer } from "./languageReducer";
import { fontReducer } from "./fontReducer";
import { themeReducer } from "./themeReducer";

export const rootReducer = combineReducers({
    theme: themeReducer,
    language: languageReducer,
    font: fontReducer
});

export type RootState = ReturnType<typeof rootReducer>;
