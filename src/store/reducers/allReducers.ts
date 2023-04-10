import { combineReducers } from "redux";
import { languageReducer } from "./languageReducer";
import { fontReducer } from "./fontReducer";
import { themeReducer } from "./themeReducer";
import {inputReducer} from "./inputReducer";
import {wordsReducer} from "./wordsReducer";
import {countDownReducer} from "./countDownReducer";

export const rootReducer = combineReducers({
    theme: themeReducer,
    language: languageReducer,
    font: fontReducer,
    input: inputReducer,
    words: wordsReducer,
    countDown: countDownReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
