import { Dispatch, useEffect, useRef, useState } from "react";
import WordsService from "../services/WordsService";
import { IWordsQuery } from "../models/IWordsQuery";
import { ILetter } from "../models/ILetter";
import { useTypedSelector } from "./useTypedSelector";
import { useDispatch } from "react-redux";
import { LettersActionTypes, LettersActions } from "../store/reducers/lettersReducer";
import { WordsActionTypes } from "../store/reducers/wordsReducer";
import useLettersData from "./useLettersData";
import {useParams} from "react-router-dom";
import axios, {Axios, AxiosResponse} from "axios";
import {IWords} from "../models/IWords";

const useWords = (mask: string, mainLetter: string, len: number) => {

    const [isLoading, setLoading] = useState(true);
    const typingLanguage = useTypedSelector(state => state.settings.typingLanguage)
    const [isError, setError] = useState(false);
    const dispatch = useDispatch();
    const { words } = useTypedSelector(state => state.words)
    const mode = useParams().mode || "learning"
    const fetchWords = async ( ) => {
        setLoading(true);
        setError(false);
        try {
            let result
            switch (mode){
                case "learning":
                    result = await WordsService.fetchWords(mask, mainLetter, len, typingLanguage)
                    break;
                case "infinity":
                    result = await WordsService.fetchRandomWords(10, typingLanguage)
                    break;
                default:
                    result = await WordsService.fetchRandomWords(len,typingLanguage)
                    break;
            }
            dispatch({ type: WordsActionTypes.SET_WORDS, payload: result.data.strings.join(" ") })
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
        if (mask === '' || mainLetter === '' || len === 0) {
            dispatch({ type: WordsActionTypes.SET_WORDS, payload: "" })
            return;
        } else {
            fetchWords();
        }
    }, [mainLetter, mask]);

    return { words, isLoading, isError, fetchWords }
}

export default useWords