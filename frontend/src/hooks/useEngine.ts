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
import { WordsActionTypes } from "../store/reducers/wordsReducer";
import { InputActionTypes } from "../store/reducers/inputReducer";
import { LettersActionTypes } from "../store/reducers/lettersReducer";

const useEngine = () => {
    const timerConst = useTypedSelector(
        (state) => state.settings.timeAttackTime
    );
    const mode = useParams().mode || "learning";
    const dispatch = useDispatch();
    const isVisible = usePageVisibility();
    const { status } = useTypedSelector((state) => state.status);
    const { timerIsActive, time, handleStart, handleStop, handleReset } =
        mode !== "timeattack" ? useTimer() : useCountdown(timerConst);
    const [leftMargin, setLeftMargin] = useState<any | null>(null);
    const [topMargin, setTopMargin] = useState<any | null>(null);
    const { words, isLoading, fetchWords, mask, mainLetter } = useWords(20);
    const { typed, cursorMarginTop, cursor, restartTyping, lastKeyPressTime } = useInput(
        status !== "finish",
        words,
        mode
    );
    const wpm =
        mode !== "timeattack"
            ? useWpm(typed, time)
            : useWpm(typed, time, timerConst);
    const accuracy = useAccuracy(words, typed, cursor);
    const isStarting = status === "start" && cursor > 0 && isLoading === false;
    const currentCharacterRef = useRef<HTMLSpanElement>(null);

    const restartTest = () => {
        dispatch({ type: "CHANGE_STATE", payload: "start" });
        handleStop();
        handleReset();
        restartTyping();
    };

    const stopTest = () => {
        dispatch({ type: "CHANGE_STATE", payload: "finish" });
        handleStop();
    }

    const addTest = async () => {
        try {
            await TestsService.addTest(mode, wpm, accuracy / 100);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    };

    // Фетчим слова и сбрасываем всё при загрузке странички
    useEffect(() => {
        dispatch({ type: WordsActionTypes.SET_WORDS, payload: "" })
        restartTest();
        fetchWords();
    }, [])

    // Перенос слов и фетчинг новых слов
    useEffect(() => {
        if (cursorMarginTop > 0) {
            dispatch({ type: InputActionTypes.SET_CURSOR_SPLIT, payload: cursor })
        }
        if (cursorMarginTop == 34 && (mode === "infinity" || mode === "timeattack")) {
            fetchWords();
        }
    }, [cursorMarginTop])

    // Останавливаем таймер при завершении и отправляем результаты в базу
    useEffect(() => {
        if (status === "finish") {
            handleStop();
            addTest();
        }
    }, [status]);

    // Отслеживаем старт для того, чтобы запустить таймер
    useEffect(() => {
        if (isStarting) {
            dispatch({ type: "CHANGE_STATE", payload: "run" });
            handleStart();
        }
    }, [isStarting]);

    // Проверки для завершения тестов
    useEffect(() => {
        if (status === "run" && timerIsActive) {
            if (mode === "learning" && words.length === cursor) {
                restartTest()
                fetchWords()
            }
            else if (words.length === cursor) {
                stopTest()
            }
            else if (mode === "timeattack" && time == 0) {
                stopTest()
            }
        }
    }, [timerIsActive, status, cursor, time]);

    // Если вкладка с печатью не в поле зрения пользователя (переключился на другое окно/вкладку), тест сбрасывается к началу.
    useEffect(() => {
        if (isVisible == false) {
            dispatch({
                type: LettersActionTypes.RESET
            })
            restartTest();
        }
    }, [isVisible]);

    // Проверка активен ли пользователь. Если он не активен в течении заданого времени, тест сбрасывается к началу.
    useEffect(() => {
        if (
            timerIsActive &&
            lastKeyPressTime != null &&
            new Date().getTime() - lastKeyPressTime >= 15 * 1000
        ) {
            dispatch({
                type: LettersActionTypes.RESET
            })
            restartTest();
        }
    }, [time]);

    return {
        status,
        words,
        typed,
        wpm,
        restart: restartTest,
        cursor,
        time,
        timerConst,
        currentCharacterRef,
        accuracy,
        mask,
        mainLetter,
        leftMargin,
        setLeftMargin,
        topMargin,
        setTopMargin
    };
};

export default useEngine;
