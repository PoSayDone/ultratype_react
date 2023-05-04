import { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import useInput from "./useInput";
import useSymbolsTypedMetric from "./useSymbolsTypedMetric";
import useCountdown from "./useCountdown";
import { useTypedSelector } from "./useTypedSelector";
import { generateWords, NUMBER_OF_WORDS, WordsActions, WordsActionTypes } from "../store/reducers/wordsReducer";
import { useDispatch } from "react-redux";
import { COUNTDOWN_SECONDS, SetDefaultCoundownSeconds } from "../store/reducers/countDownReducer";
import axios from "axios";

export type State = "start" | "run" | "finish" | "restart";

const useEngine = () => {
    const timeConst = 140;
    const [state, setState] = useState<State>("start");
    const { timeLeft, timerIsActive, setTimerIsActive, setTimeLeft } = useCountdown();


    // useWords как таковой теперь не нужен ( пока его не удалял(
    const { words } = useTypedSelector(state => state.words);

    // если она нужна будет ? (достал из useWords но вроде нигде не юзалась)
    const updateWords = useCallback(() => {
        const dispatch: Dispatch<WordsActions> = useDispatch()
        dispatch({ type: WordsActionTypes.SET_WORDS, payload: generateWords(NUMBER_OF_WORDS) })
    }, [NUMBER_OF_WORDS])


    useEffect(() => {
        if (state === "start") {
            setTimerIsActive(false)
            SetDefaultCoundownSeconds(timeConst)
            setTimeLeft(COUNTDOWN_SECONDS) // тут делается нужное время
        }
    }, [state])


    const {
        typed,
        maxTyped,
        cursor,
        totalTyped,
        restartTyping,
        accuracy,
        setTypedNumber
    } = useInput(state !== "finish", words);

    const { wpm } = useSymbolsTypedMetric(
        state !== "finish",
        totalTyped,
        timeConst,
        timeLeft,
    );
    const currentCharacterRef = useRef<HTMLSpanElement>(null);
    const isStarting = state === "start" && cursor > 0;

    useEffect(
        () => {
            if (state === "run") {
                if (
                    typed[cursor - 1] &&
                    typed[cursor - 1] === words[cursor - 1]
                ) {
                    setTypedNumber(1, 1);
                } else if (
                    typed[cursor - 1] &&
                    typed[cursor - 1] !== words[cursor - 1]
                )
                    setTypedNumber(1, 0);
            }
        },
        [maxTyped]
    );

    useEffect(
        () => {
            if (state === "finish") {
                setTimerIsActive(false);
                // Формируем резы
                const stats = {
                    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    mode: "unknown",
                    wpm: wpm,
                    accuracy: (accuracy / 100)
                }
                // Отправляем результаты на сервер
                axios
                    .post("http://localhost:5206/tests/", stats,
                        {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
            }
        },
        [state]
    );

    useEffect(
        () => {
            if (isStarting) {
                setState("run");
                setTimerIsActive(true);
            }
        },
        [isStarting]
    );

    useEffect(
        () => {
            if (!timerIsActive && state === "run") {
                setState("finish");
            }
        },
        [timerIsActive, state]
    );

    useEffect(
        () => {
            if (words.length === cursor) setState("finish");
        },
        [words, typed]
    );

    const restart = () => {
        setState("start");
        restartTyping();
    };

    return {
        state,
        words,
        typed,
        wpm,
        restart,
        cursor,
        timeLeft,
        timeConst,
        currentCharacterRef,
        accuracy
    };

};

export default useEngine;
