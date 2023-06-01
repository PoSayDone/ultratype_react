import { combineReducers } from "redux";
import { inputReducer } from "./inputReducer";
import { wordsReducer } from "./wordsReducer";
import { countDownReducer } from "./countDownReducer";
import { statusReducer } from "./statusReducer";
import { userReducer } from "./userReducer";
import { lettersReducer } from "./lettersReducer";
import timerReducer from "./timerReducer";
import settingsReducer from "./settingsReducer";

export const rootReducer = combineReducers({
    status: statusReducer,
    input: inputReducer,
    words: wordsReducer,
    countDown: countDownReducer,
    user: userReducer,
    letters: lettersReducer,
    timer: timerReducer,
    settings: settingsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
