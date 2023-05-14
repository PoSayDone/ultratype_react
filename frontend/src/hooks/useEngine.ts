import { useEffect, useRef, useState } from "react";
import useInput from "./useInput";
import useCountdown from "./useCountdown";
import { useTypedSelector } from "./useTypedSelector";
import { COUNTDOWN_SECONDS, SetDefaultCoundownSeconds } from "../store/reducers/countDownReducer";
import { useDispatch } from "react-redux";
import TestsService from "../services/TestsService";
import useWords from "./useWords";
import useWpm from "./useWpm";
import useAccuracy from "./useAccuracy";
import useLettersData from "./useLettersData";

const useEngine = () => {
    const dispatch = useDispatch();
    const timeConst = 140;
    const [isMounted, setIsMounted] = useState(false);

    const { updateLetters, mask, mainLetter } = useLettersData();
    const { status } = useTypedSelector(state => state.status);
    const { timeLeft, timerIsActive, setTimerIsActive, setTimeLeft } = useCountdown();
    const { words, isLoading } = useWords({ mask: mask, mainLetter: mainLetter, len: 20 });
    const { typed, cursor, restartTyping } = useInput(status !== "finish", words);
    const wpm = useWpm(typed, timeConst, timeLeft);
    const accuracy = useAccuracy(words, typed, cursor);
    const isStarting = status === "start" && cursor > 0 && isLoading === false;
    const currentCharacterRef = useRef<HTMLSpanElement>(null);

    const addTest = async () => {
        try {
            await TestsService.addTest("unknown", wpm, (accuracy / 100));
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    const restart = () => {
        dispatch({ type: "CHANGE_STATE", payload: "start" })
        restartTyping();
    };

    useEffect(() => {
        if (status === "start") {
            setTimerIsActive(false)
            SetDefaultCoundownSeconds(timeConst)
            setTimeLeft(COUNTDOWN_SECONDS) // тут делается нужное время
        }
    }, [status])

    useEffect(
        () => {
            if (isMounted) {
                if (status === "finish") {
                    setTimerIsActive(false);
                    addTest()
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
                // console.log(isLoading)
                dispatch({ type: "CHANGE_STATE", payload: "run" })
                setTimerIsActive(true);
            }
        },
        [isStarting]
    );

    useEffect(
        () => {
            if (!timerIsActive && status === "run" || words.length === cursor && status === "run") {
                dispatch({ type: "CHANGE_STATE", payload: "finish" })
                updateLetters()
            }
        },
        [timerIsActive, status, words, typed]
    );

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
        accuracy,
        mask,
        mainLetter
    };
};

export default useEngine;
