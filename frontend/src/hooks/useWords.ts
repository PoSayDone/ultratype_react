import { Dispatch, useEffect, useRef, useState } from "react";
import WordsService from "../services/WordsService";
import { IWordsQuery } from "../models/IWordsQuery";
import { ILetter } from "../models/ILetter";
import { useTypedSelector } from "./useTypedSelector";
import { useDispatch } from "react-redux";
import { LetterActionTypes, LetterActions } from "../store/reducers/letterReducer";
import { WordsActionTypes } from "../store/reducers/wordsReducer";
import useLettersData from "./useLettersData";

const useWords = (query: IWordsQuery) => {

    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const dispatch = useDispatch();
    const { words } = useTypedSelector(state => state.words)

    const fetchWords = async () => {
        setLoading(true);
        setError(false);
        try {
            const result = await WordsService.fetchWords(query.mask, query.mainLetter, query.len)
            dispatch({ type: WordsActionTypes.SET_WORDS, payload: result.data.strings.join(" ") })
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
        if (!query || query.mask === '' || query.mainLetter === '' || query.len === 0) {
            dispatch({ type: WordsActionTypes.SET_WORDS, payload: "" })
            return;
        } else {
            fetchWords();
        }
    }, [query.mainLetter, query.mask]);

    return { words, isLoading, isError }
}

export default useWords