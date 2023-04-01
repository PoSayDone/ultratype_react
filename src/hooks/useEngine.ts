import { createContext, useContext, useEffect, useState } from "react";
import useWords from "./useWords";
import useInput from "./useInput";
import useSymbolsTypedMetric from "./useSymbolsTypedMetric";
import useCountdown from "./useCountdown";

export type State = "start" | "run" | "finish"

const NUMBER_OF_WORDS = 20;
const TIME = 120;

const useEngine = () => {
    const [state, setState] = useState<State>("start");
    const { seconds, timerIsActive, setTimerActive } = useCountdown(TIME);
    const { words, updateWords } = useWords(NUMBER_OF_WORDS)
    const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useInput(state !== 'finish', words)
    const { wpm } = useSymbolsTypedMetric(state !== 'finish', totalTyped, TIME - seconds, typed)

    const isStarting = state === "start" && cursor > 0;

    useEffect(() => {
        if (state === "finish") {
            setTimerActive(false)
        }
    }, [state])

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
        if (words.length === typed.length)
            setState("finish")
    }, [words, typed])

    const restart = () => {
        clearTyped()
        resetTotalTyped()
        setState("start")
    }

    return { state, words, typed, wpm, seconds, restart, cursor }
}

export default useEngine;