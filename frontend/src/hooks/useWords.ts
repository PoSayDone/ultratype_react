import { useEffect, useState } from "react";
import WordsService from "../services/WordsService";
import { useTypedSelector } from "./useTypedSelector";
import { useDispatch } from "react-redux";
import { WordsActionTypes } from "../store/reducers/wordsReducer";
import { useParams } from "react-router-dom";
import { InputActionTypes } from "../store/reducers/inputReducer";

const useWords = (mask: string, mainLetter: string, len: number) => {

    const { cursorMarginTop, cursor } = useTypedSelector(state => state.input)
    const [isLoading, setLoading] = useState(true);
    const letters = localStorage.getItem('userLetters')
    const typingLanguage = useTypedSelector(state => state.settings.typingLanguage)
    const [isError, setError] = useState(false);
    const dispatch = useDispatch();
    const { words } = useTypedSelector(state => state.words)
    const mode = useParams().mode || "learning"

    const fetchWords = async () => {
        setLoading(true);
        setError(false);
        try {
            let result
            switch (mode) {
                case "learning":
                    result = await WordsService.fetchWords(mask, mainLetter, len, typingLanguage)
                    dispatch({ type: WordsActionTypes.SET_WORDS, payload: result.data.strings.join(" ") })
                    break;
                case "infinity":
                    result = await WordsService.fetchRandomWords(10, typingLanguage)
                    if (words == "") {
                        dispatch({
                            type: WordsActionTypes.SET_WORDS,
                            payload: result.data.strings.join(" "),
                        });
                    }
                    else {

                        dispatch({
                            type: WordsActionTypes.SET_WORDS,
                            payload: words + " " + result.data.strings.join(" "),
                        });
                    }
                    break;
                default:
                    result = await WordsService.fetchRandomWords(len, typingLanguage)
                    dispatch({ type: WordsActionTypes.SET_WORDS, payload: result.data.strings.join(" ") })
                    break;
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
        if (mode === "learning") {
            if (mask === '' || mainLetter === '' || len === 0) {
                dispatch({ type: WordsActionTypes.SET_WORDS, payload: "" })
                return;
            } else {
                fetchWords();
            }
        }
    }, [mainLetter, mask, letters]);

    useEffect(() => {
        if (cursorMarginTop > 0) {
            dispatch({ type: InputActionTypes.SET_CURSOR_SPLIT, payload: cursor })
        }
        if (mode === "infinity" || mode === "timeattack") {
            fetchWords();
        }
    }, [cursorMarginTop])

    return { words, isLoading, isError, fetchWords }
}

export default useWords