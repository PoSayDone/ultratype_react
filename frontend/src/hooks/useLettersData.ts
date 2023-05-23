import { useDispatch } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";
import { LettersActionTypes, LettersActions } from "../store/reducers/lettersReducer";
import { Dispatch, useCallback, useEffect, useState } from "react";
import { LettersToAddActionTypes } from "../store/reducers/lettersToAddReducer";

interface LettersData {
    updateLetters: () => void;
    mask: string;
    mainLetter: string;
}

const useLettersData = (): LettersData => {
    const typedLang = useTypedSelector((state) => state.settings.typingLanguage);
    const letters = useTypedSelector((state) => state.letters[typedLang]);
    const lettersToAdd = useTypedSelector((state) => state.lettersToAdd);
    const dispatch = useDispatch();

    const [mask, setMask] = useState<string>(() => Object.keys(letters).join(""));
    const [mainLetter, setMainLetter] = useState<string>("");

    const addLetter = useCallback(() => {
        dispatch({
            type: LettersActionTypes.ADD_LETTER,
            payload: { lang: typedLang, letter: lettersToAdd[typedLang].letters.charAt(0) },
        });
        dispatch({
            type: LettersToAddActionTypes.REMOVE_LETTER,
            payload: { lang: typedLang },

        });
    }, [dispatch, lettersToAdd.letters, typedLang]);

    const findMainLetter = useCallback(() => {
        const goodConfidence = 1;
        let minConfidence = goodConfidence;
        let minLetter = "";

        for (const [letter, value] of Object.entries(letters)) {
            if (value.hasOwnProperty("confidence")) {
                const confidence = value.confidence;
                if (confidence < minConfidence) {
                    minConfidence = confidence;
                    minLetter = letter;
                }
            }
        }

        if (minConfidence >= goodConfidence) {
            addLetter();
            const keys = Object.keys(letters);
            return keys[keys.length - 1];
        }

        return minLetter;
    }, [addLetter, letters]);

    const updateLetters = useCallback(() => {
        setMainLetter(findMainLetter());
        setMask(Object.keys(letters).join(""));
        localStorage.setItem(`userLetters`, JSON.stringify(letters));
    }, [findMainLetter, letters, lettersToAdd.letters, typedLang]);

    useEffect(() => {
        updateLetters();
    }, []);

    return { updateLetters, mask, mainLetter };
};

export default useLettersData;