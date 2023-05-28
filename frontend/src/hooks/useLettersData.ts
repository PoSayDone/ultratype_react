import { useDispatch } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";
import { LettersActionTypes, LettersActions } from "../store/reducers/lettersReducer";
import { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import { LettersToAddActionTypes } from "../store/reducers/lettersToAddReducer";

const useLettersData = () => {
    const typedLang = useTypedSelector((state) => state.settings.typingLanguage);
    const letters = useTypedSelector((state) => state.letters);
    const lettersToAdd = useTypedSelector((state) => state.lettersToAdd);
    const dispatch = useDispatch();
    const mainLetterRef = useRef<string>("");
    let mainLetter : string = "";
    const [mask, setMask] = useState<string>(() => Object.keys(letters[typedLang]).join(""));

    const addLetter = () => {
        dispatch({
            type: LettersActionTypes.ADD_LETTER,
            payload: { lang: typedLang, letter: lettersToAdd[typedLang].letters.charAt(0) },
        });
        dispatch({
            type: LettersToAddActionTypes.REMOVE_LETTER,
            payload: { lang: typedLang },

        });
    }

    const findMainLetter = () => {
        const goodConfidence = 1;
        let minConfidence = goodConfidence;
        let minLetter = "";

        for (const [letter, value] of Object.entries(letters[typedLang])) {
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
            const keys = Object.keys(letters[typedLang]);
            return keys[keys.length - 1];
        }

        return minLetter;
    };

    const updateLetters = async () => {
        mainLetter = await findMainLetter();
        setMask(Object.keys(letters[typedLang]).join(""));
        localStorage.setItem(`userLetters`, JSON.stringify(letters));
    };

    return { updateLetters, mask, mainLetter };
};

export default useLettersData;