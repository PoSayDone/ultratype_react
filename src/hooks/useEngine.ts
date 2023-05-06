import { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import useInput from "./useInput";
import useSymbolsTypedMetric from "./useSymbolsTypedMetric";
import useCountdown from "./useCountdown";
import { useTypedSelector } from "./useTypedSelector";
import { COUNTDOWN_SECONDS, SetDefaultCoundownSeconds } from "../store/reducers/countDownReducer";
import axios from "axios";
import Cookies from "js-cookie";
import { InputActions } from "../store/reducers/inputReducer";
import { StatusActionType } from "../store/reducers/statusReducer";
import { useDispatch } from "react-redux";

const useEngine = () => {
    const dispatch = useDispatch()
    const timeConst = 140;
    // const [state, setState] = useState<State>();
    const { status } = useTypedSelector(state => state.status);
    const { words } = useTypedSelector(state => state.words);
    const { timeLeft, timerIsActive, setTimerIsActive, setTimeLeft } = useCountdown();
    const [isMounted, setIsMounted] = useState(false);

    // если она нужна будет ? (достал из useWords но вроде нигде не юзалась)
    // const updateWords = useCallback(() => {
    //     const dispatch: Dispatch<WordsActions> = useDispatch()
    //     dispatch({ type: WordsActionTypes.SET_WORDS, payload: generateWords(NUMBER_OF_WORDS) })
    // }, [NUMBER_OF_WORDS])

    useEffect(() => {
        if (status === "start") {
            setTimerIsActive(false)
            SetDefaultCoundownSeconds(timeConst)
            setTimeLeft(COUNTDOWN_SECONDS) // тут делается нужное время
        }
    }, [status])

    const {
        typed,
        maxTyped,
        cursor,
        totalTyped,
        restartTyping,
        accuracy,
        setTypedNumber
    } = useInput(status !== "finish", words);

    const { wpm } = useSymbolsTypedMetric(
        status !== "finish",
        totalTyped,
        timeConst,
        timeLeft,
    );
    const currentCharacterRef = useRef<HTMLSpanElement>(null);
    const isStarting = status === "start" && cursor > 0;

    useEffect(
        () => {
            if (status === "run") {
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
            if (isMounted) {
                if (status === "finish") {
                    setTimerIsActive(false);

                    // Формируем резы
                    const stats = {
                        mode: "unknown",
                        wpm: wpm,
                        accuracy: (accuracy / 100)
                    }

                    // Отправляем результаты на сервер
                    axios
                        .post("https://localhost:7025/tests", stats,
                            {
                                headers: {
                                    "Authorization": `Bearer ${Cookies.get("_auth")}`,
                                    "Content-Type": "application/json"
                                }
                            })
                }
            } else {
                setIsMounted(true);
            }
        },
        [status]
    );

    useEffect(
        () => {
            if (isStarting) {
                dispatch({ type: "CHANGE_STATE", payload: "run" })
                setTimerIsActive(true);
            }
        },
        [isStarting]
    );

    useEffect(
        () => {
            if (!timerIsActive && status === "run") {
                dispatch({ type: "CHANGE_STATE", payload: "finish" })
            }
        },
        [timerIsActive, status]
    );

    useEffect(
        () => {
            if (words.length === cursor) {
                dispatch({ type: "CHANGE_STATE", payload: "finish" })
            }
        },
        [words, typed]
    );

    const restart = () => {
        dispatch({ type: "CHANGE_STATE", payload: "start" })
        restartTyping();
    };

    return {
        status,
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
