import {Dispatch, useCallback, useEffect, useRef, useState} from "react";
import useWords from "./useWords";
import useInput from "./useInput";
import useSymbolsTypedMetric from "./useSymbolsTypedMetric";
import useCountdown from "./useCountdown";
import { useTypedSelector } from "./useTypedSelector";
import {generateWords, NUMBER_OF_WORDS, WordsActions, WordsActionTypes} from "../store/reducers/wordsReducer";
import {useDispatch} from "react-redux";

export type State = "start" | "run" | "finish" | "restart";



const COUNTDOWN_SECONDS = 120;

const useEngine = () => {
     const [state, setState] = useState<State>("start");
     const { timeLeft, timerIsActive, setTimerIsActive } = useCountdown(
          COUNTDOWN_SECONDS
     );
     // useWords как таковой теперь не нужен ( пока его не удалял(
     const { words } = useTypedSelector(state => state.words);

     // если она нужна будет ? (достал из useWords но вроде нигде не юзалась)
     const updateWords = useCallback(() => {
          const dispatch : Dispatch<WordsActions> = useDispatch()
          dispatch({type: WordsActionTypes.SET_WORDS, payload: generateWords(NUMBER_OF_WORDS)})
     }, [NUMBER_OF_WORDS])


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
          COUNTDOWN_SECONDS,
          timeLeft,
          typed
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
          [isStarting, setTimerIsActive]
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

     useEffect(
          () => {
               if (state === "restart") {
                    setState("start");
                    restartTyping();
               }
          },
          [state]
     );

     const restart = () => {
          setState("restart");
     };

     return {
          state,
          words,
          typed,
          wpm,
          restart,
          cursor,
          timeLeft,
          currentCharacterRef,
          accuracy
     };
};

export default useEngine;
