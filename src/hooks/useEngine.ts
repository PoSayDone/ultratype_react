import { createContext, useContext, useEffect, useState } from "react";
import useWords from "./useWords";
import useInput from "./useInput";
import useSymbolsTypedMetric from "./useSymbolsTypedMetric";
import useCountdown from "./useCountdown";

export type State = "start" | "run" | "finish"

const NUMBER_OF_WORDS = 30;
const TIME = 120;

const useEngine = () => {
    const [state, setState] = useState<State>("start");
    const { seconds, timerIsActive, setTimerActive } = useCountdown(TIME);
    const { words, updateWords } = useWords(NUMBER_OF_WORDS)
    const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useInput(state !== 'finish', words)
    const { wpm } = useSymbolsTypedMetric(state !== 'finish', totalTyped, TIME - seconds, typed)

    const isStarting = state === "start" && cursor > 0;

    useEffect(() => {
        if (isStarting) {
            setState("run");
            setTimerActive(true);
        }
    }, [isStarting, setTimerActive]);

    useEffect(() => {
        if (!timerIsActive && state === "run") {
            setState("finish");
        }
    }, [timerIsActive, state]);

    useEffect(() => {
        if (state === "finish") {
            setTimerActive(false)
        }
    }, [state])

    const restart = () => {
        clearTyped()
        resetTotalTyped()
    }

    return { state, words, typed, wpm, seconds , restart , cursor}
}

export default useEngine;