import { Dispatch, useEffect, useRef, useState } from "react";
import WordsService from "../services/WordsService";
import { IWordsQuery } from "../models/IWordsQuery";
import { ILetter } from "../models/ILetter";
import { useTypedSelector } from "./useTypedSelector";
import { useDispatch } from "react-redux";
import { LetterActionTypes, LetterActions } from "../store/reducers/letterReducer";

const useWords = (query: IWordsQuery) => {

    const goodConfidence = 1
    const letters : ILetter = useTypedSelector(state => state.letters)
    const [lettersToAdd, setLettersToAdd] = useState<string[]>("s".split(""))
    const [words, setWords] = useState<string>("");
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);

    const dispatch : Dispatch<LetterActions> = useDispatch();

    // Высчитываем то, как хорошо пользователь управляется с буквой
    const calculateConfidence = (errorRate: number, wpm: number) => {
        const errorFactor = (1 - errorRate) / 100
        const wpmFactor = wpm / 100
        return errorFactor * wpmFactor
    }

    const findMainLetter = () => {

        let minConfidence = goodConfidence;
        let minLetter = null;

        // проходимся по всем ключам объекта
        for (const letter in letters) {
            // проверяем, что объект соответствующий ключу содержит свойство confidence
            if (letters[letter].hasOwnProperty("confidence")) {
                const confidence = letters[letter].confidence;
                if (confidence < minConfidence) {
                    minConfidence = confidence;
                    minLetter = letter;
                }
            }
        }
        return minLetter;
    }

    const addLetter = () => {
        dispatch({type: LetterActionTypes.ADD_LETTER, payload: { letter : lettersToAdd[0] } })
        setLettersToAdd(lettersToAdd.slice(1))
    }

    const fetchWords = async () => {
        setLoading(true);
        setError(false);
        try {
            const result = await WordsService.fetchWords(query.mask, query.mainChar, query.len)
            setWords(result.data.strings.join(" "));
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError(true);
        }
    }


    useEffect(() => {
        if (!query || query.mask === '' || query.mainChar === '' || query.len === 0) {
            setWords("");
            return;
        } else {
            fetchWords();
        }
    }, []);

    return { words, isLoading, isError , letters  }
}

export default useWords