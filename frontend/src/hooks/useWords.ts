import { useEffect, useState } from "react";
import WordsService from "../services/WordsService";
import { useTypedSelector } from "./useTypedSelector";
import { useDispatch } from "react-redux";
import { WordsActionTypes } from "../store/reducers/wordsReducer";
import { useParams } from "react-router-dom";
import { InputActionTypes } from "../store/reducers/inputReducer";
import useLettersData from "./useLettersData";

const useWords = (len: number) => {

    const [isLoading, setLoading] = useState(true);
    const { updateLetters, mask, mainLetter } = useLettersData();
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
                    await updateLetters();
                    break;
                case "timeattack":
                case "infinity":
                    result = await WordsService.fetchRandomWords(20, typingLanguage)
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
        const getWords = async () => {
            try {
                const result = await WordsService.fetchWords(mask, mainLetter, len, typingLanguage);
                dispatch({ type: WordsActionTypes.SET_WORDS, payload: result.data.strings.join(" ") });
            } catch (error) {
                console.error(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (mainLetter) {
            getWords();
        }
    }, [mainLetter]);

    return { mask, mainLetter, words, isLoading, isError, fetchWords }
}

export default useWords