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

const useEngine = () => {

    const dispatch = useDispatch()
    const timeConst = 140;
    const { status } = useTypedSelector(state => state.status);
    const { text, isLoading } = useWords({ mask: "enitrl", mainChar: "e", len: 20 })
    const { timeLeft, timerIsActive, setTimerIsActive, setTimeLeft } = useCountdown();
    const [isMounted, setIsMounted] = useState(false);
    const { typed, cursor, restartTyping } = useInput(status !== "finish", text);
    const accuracy = useAccuracy(text, typed, cursor);
    const wpm = useWpm(typed, timeConst, timeLeft);
    const currentCharacterRef = useRef<HTMLSpanElement>(null);
    const isStarting = status === "start" && cursor > 0 && isLoading === false;

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
                    // for (let lettersKey in letters) {
                    //     console.log(letters[lettersKey])
                    // }
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
            if (!timerIsActive && status === "run") {
                dispatch({ type: "CHANGE_STATE", payload: "finish" })
            }
        },
        [timerIsActive, status]
    );

    useEffect(
        () => {
            if (text.length === cursor && status === "run") {
                dispatch({ type: "CHANGE_STATE", payload: "finish" })
            }
        },
        [text, typed]
    );

    return {
        status,
        words: text,
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
