import { useEffect, useRef, useState } from "react";
import useInput from "./useInput";
import useCountdown from "./useCountdown";
import { useTypedSelector } from "./useTypedSelector";
import { useDispatch } from "react-redux";
import TestsService from "../services/TestsService";
import useWords from "./useWords";
import useWpm from "./useWpm";
import useAccuracy from "./useAccuracy";
import useLettersData from "./useLettersData";
import usePageVisibility from "./usePageVisibility";
import { useParams } from "react-router-dom";
import useTimer from "./useTimer";

const useEngine = () => {
    const timerConst = 20
    const mode = useParams().mode || "learning"
    const dispatch = useDispatch();
    const [isMounted, setIsMounted] = useState(false);
    const isVisible = usePageVisibility()
    const { updateLetters, mask, mainLetter } = useLettersData();
    const { status } = useTypedSelector(state => state.status);
    const { timerIsActive, time, handleStart, handleStop, handleReset } = mode === "infinity" ?  useTimer() : useCountdown(timerConst);
    const { words, isLoading, fetchWords } = useWords(mask, mainLetter, 25);
    const { typed, cursor, restartTyping, lastKeyPressTime} = useInput(status !== "finish", words);
    const wpm = mode === "infinity" ? useWpm(typed, time) : useWpm(typed, time, timerConst)
    const accuracy = useAccuracy(words, typed, cursor);
    const isStarting = status === "start" && cursor > 0 && isLoading === false;
    const currentCharacterRef = useRef<HTMLSpanElement>(null);
    
    const addTest = async () => {
        try {
            await TestsService.addTest(mode, wpm, (accuracy / 100));
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    const restart = () => {
        dispatch({ type: "CHANGE_STATE", payload: "start" })
        handleStop()
        handleReset()
        restartTyping();
    };

    useEffect(
        () => {
            if (isMounted) {
                if (status === "finish") {
                    handleStop()
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
                dispatch({ type: "CHANGE_STATE", payload: "run" })
                handleStart()
            }
        },
        [isStarting]
    );

    useEffect(
        () => {
            if (!timerIsActive && status === "run" || words.length === cursor && status === "run") {
                updateLetters()
                if (mode !== "learning")
                    dispatch({ type: "CHANGE_STATE", payload: "finish" })
                else {
                    restart()
                }
            }
        },
        [timerIsActive, status, words, typed]
    );

    useEffect(() => {
        if (mode === "timeattack" && timerIsActive && status=== "run"){
            if (time === 0){
                dispatch({type : "CHANGE_STATE",payload: "finish"})
            }
        }
    },[time,timerIsActive,timerConst])

    useEffect(
        () => {
            if (isVisible == false) {
                restart()
            }
        },
        [timerIsActive, status, isVisible]
    );

    useEffect(
        () => {
            if (timerIsActive && lastKeyPressTime != null && new Date().getTime() - lastKeyPressTime >= 15 * 1000) {
                restart()
            }
        },
        [time]
    );

    return {
        status,
        words,
        typed,
        wpm,
        restart,
        cursor,
        time,
        timerConst,
        currentCharacterRef,
        accuracy,
        mask,
        mainLetter
    };
};

export default useEngine;