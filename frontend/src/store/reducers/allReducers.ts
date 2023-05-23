import { combineReducers } from "redux";
import { inputReducer } from "./inputReducer";
import { wordsReducer } from "./wordsReducer";
import { countDownReducer } from "./countDownReducer";
import { statusReducer } from "./statusReducer";
import { userReducer } from "./userReducer";
import { lettersReducer } from "./lettersReducer";
import timerReducer from "./timerReducer";
import settingsReducer from "./settingsReducer";
import { lettersToAddReducer } from "./lettersToAddReducer";

export const rootReducer = combineReducers({
    status: statusReducer,
    input: inputReducer,
    words: wordsReducer,
    countDown: countDownReducer,
    user: userReducer,
    letters: lettersReducer,
    lettersToAdd: lettersToAddReducer,
    timer: timerReducer,
    settings: settingsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
