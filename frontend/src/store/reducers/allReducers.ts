import { combineReducers } from "redux";
import { languageReducer } from "./languageReducer";
import { fontReducer } from "./fontReducer";
import { themeReducer } from "./themeReducer";
import { inputReducer } from "./inputReducer";
import { wordsReducer } from "./wordsReducer";
import { countDownReducer } from "./countDownReducer";
import { statusReducer } from "./statusReducer";
import { userReducer } from "./userReducer";
import { letterReducer } from "./letterReducer";
import timerReducer from "./timerReducer";
import settingsReducer from "./settingsReducer";

export const rootReducer = combineReducers({
    status: statusReducer,
    input: inputReducer,
    words: wordsReducer,
    countDown: countDownReducer,
    user: userReducer,
    letters: letterReducer,
    timer: timerReducer,
    settings: settingsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
