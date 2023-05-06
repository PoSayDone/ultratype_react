import { combineReducers } from "redux";
import { languageReducer } from "./languageReducer";
import { fontReducer } from "./fontReducer";
import { themeReducer } from "./themeReducer";
import { inputReducer } from "./inputReducer";
import { wordsReducer } from "./wordsReducer";
import { countDownReducer } from "./countDownReducer";
import { authReducer } from "./authReducer";
import { statusReducer } from "./statusReducer";

export const rootReducer = combineReducers({
    status: statusReducer,
    theme: themeReducer,
    language: languageReducer,
    font: fontReducer,
    input: inputReducer,
    words: wordsReducer,
    countDown: countDownReducer,
    login: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
