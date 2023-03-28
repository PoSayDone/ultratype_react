import { createContext, useContext, useEffect, useState } from "react";
import useWords from "./useWords";
import useTypings from "./useTypings";
import useSymbolsTypedMetric from "./useSymbolsTypedMetric";
import useCountdown from "./useCountdown";

export type State = "start" | "run" | "finish"

const NUMBER_OF_WORDS = 30;
const TIME = 120;

const useEngine = () => {
    const [state, setState] = useState<State>("start");
    const { seconds, timerIsActive, setTimerActive } = useCountdown(TIME);
    const { words, updateWords } = useWords(NUMBER_OF_WORDS)
    const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTypings(state !== 'finish')
    const { wpm } = useSymbolsTypedMetric(state !== 'finish', totalTyped, TIME-seconds, typed)

    useEffect(() => {
        if (!timerIsActive) {
            setState("run");
            setTimerActive(true);
        }
    }, [timerIsActive, setTimerActive]);

    return { state, words, typed, wpm, seconds }
}


export default useEngine;