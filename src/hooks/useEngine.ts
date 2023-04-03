import {createContext, useContext, useEffect, useRef, useState} from "react";
import useWords from "./useWords";
import useInput from "./useInput";
import useSymbolsTypedMetric from "./useSymbolsTypedMetric";
import useCountdown from "./useCountdown";

export type State = "start" | "run" | "finish" | 'restart'

const NUMBER_OF_WORDS = 20;
const COUNTDOWN_SECONDS = 120;

const useEngine = () => {
	const [state, setState] = useState<State>("start");
	const {timeLeft, timerIsActive, setTimerIsActive} = useCountdown(COUNTDOWN_SECONDS);
	const {words, updateWords} = useWords(NUMBER_OF_WORDS)
	const {typed, cursor, clearTyped, resetTotalTyped, totalTyped,restartTyping } = useInput(state !== 'finish', words)
	const {wpm} = useSymbolsTypedMetric(state !== 'finish', totalTyped, COUNTDOWN_SECONDS, timeLeft, typed)
	const currentCharacterRef = useRef<HTMLSpanElement>(null)
	const isStarting = state === "start" && cursor > 0;

	useEffect(() => {
		if (state === "finish") {
			setTimerIsActive(false)
		}
	}, [state])

	useEffect(() => {
		if (isStarting) {
			setState("run");
			setTimerIsActive(true);
		}
	}, [isStarting, setTimerIsActive]);

	useEffect(() => {
		if (!timerIsActive && state === "run") {
			setState("finish");
		}
	}, [timerIsActive, state]);

	useEffect(() => {
		if (words.length === cursor)
			setState("finish")
	}, [words, typed])

    useEffect(() => {
        if (state === 'restart'){
            setState('start')
            restartTyping()
        }
    },[state])

	const restart = () => {
		setState('restart')
	}


	return {state, words, typed, wpm, restart, cursor, timeLeft, currentCharacterRef }
}

export default useEngine;