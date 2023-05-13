import {useEffect, useRef, useState} from "react";
import useInput from "./useInput";
import useSymbolsTypedMetric from "./useSymbolsTypedMetric";
import useCountdown from "./useCountdown";
import {useTypedSelector} from "./useTypedSelector";
import {COUNTDOWN_SECONDS, SetDefaultCoundownSeconds} from "../store/reducers/countDownReducer";
import {useDispatch} from "react-redux";
import TestsService from "../services/TestsService";
import useWords from "./useWords";
import {WordsActionTypes} from "../store/reducers/wordsReducer";
import WordsService from "../services/WordsService";
import {LetterActionTypes} from "../store/reducers/letterReducer";

const useEngine = () => {

	const dispatch = useDispatch()
	const timeConst = 140;
	const {status} = useTypedSelector(state => state.status);
	// const { words } = useTypedSelector(state => state.words);
	const {words, isLoading, isError, letters} = useWords({mask: "enitrl", mainChar: "e", len: 20})
	const {timeLeft, timerIsActive, setTimerIsActive, setTimeLeft} = useCountdown();
	const [isMounted, setIsMounted] = useState(false);

	const addTest = async () => {
		try {
			await TestsService.addTest("unknown", wpm, (accuracy / 100));
		} catch (e: any) {
			console.log(e.response?.data?.message);
		}
	}

	const {
		typed,
		maxTyped,
		cursor,
		totalTyped,
		restartTyping,
		accuracy,
		setTypedNumber,
		setLetterData
	} = useInput(status !== "finish", words);

	const {wpm} = useSymbolsTypedMetric(
		status !== "finish",
		totalTyped,
		timeConst,
		timeLeft,
	);

	const currentCharacterRef = useRef<HTMLSpanElement>(null);
	const isStarting = status === "start" && cursor > 0 && isLoading === false;

	useEffect(() => {
		if (status === "start") {
			setTimerIsActive(false)
			SetDefaultCoundownSeconds(timeConst)
			setTimeLeft(COUNTDOWN_SECONDS) // тут делается нужное время
		}
	}, [status])

	useEffect(
		() => {
			if (status === "run") {
				if (
					typed[cursor - 1] &&
					typed[cursor - 1] === words[cursor - 1]
				) {
					// setLetterData(typed[cursor - 1])
					setTypedNumber(1, 1);
				} else if (
					typed[cursor - 1] &&
					typed[cursor - 1] !== words[cursor - 1]
				) {
					// setLetterData(typed[cursor - 1], false)
					setTypedNumber(1, 0);
				}
			}
		},
		[maxTyped]
	);

	useEffect(
		() => {
			if (isMounted) {
				if (status === "finish") {
					setTimerIsActive(false);
					addTest()
					for (let lettersKey in letters) {
						console.log(letters[lettersKey])
					}
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
				console.log(isLoading)
				dispatch({type: "CHANGE_STATE", payload: "run"})
				setTimerIsActive(true);
			}
		},
		[isStarting]
	);

	useEffect(
		() => {
			if (!timerIsActive && status === "run") {
				dispatch({type: "CHANGE_STATE", payload: "finish"})
			}
		},
		[timerIsActive, status]
	);

	useEffect(
		() => {
			if (words.length === cursor && status === "run") {
				dispatch({type: "CHANGE_STATE", payload: "finish"})
			}
		},
		[words, typed]
	);

	const restart = () => {
		dispatch({type: "CHANGE_STATE", payload: "start"})
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
