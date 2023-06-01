import { useDispatch } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";
import { LettersActionTypes } from "../store/reducers/lettersReducer";
import {useState } from "react";
import LettersService from "../services/LettersService";
import { lettersToAddConst } from "../constants/lettersToAddConst";

const useLettersData = () => {
    const typedLang = useTypedSelector((state) => state.settings.typingLanguage);
    const letters = useTypedSelector((state) => state.letters);
    const dispatch = useDispatch();
    const [lettersData, setLettersData] = useState({
        mask: Object.keys(letters[typedLang]).join(""),
        mainLetter: ""
    })

    const addLetter = () => {
        const letterToAdd = lettersToAddConst[typedLang].letters.replace(lettersData.mask, "").charAt(0)
        dispatch({
            type: LettersActionTypes.ADD_LETTER,
            payload: {
                lang: typedLang,
                letter: letterToAdd
            },
        });
    }

    const findMainLetter = async () => {
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
        setLettersData({ mainLetter: await findMainLetter(), mask: Object.keys(letters[typedLang]).join("") })
        localStorage.setItem(`userLetters`, JSON.stringify(letters));
        LettersService.setLetters(letters);
    };

    return { updateLetters, lettersData };
};

export default useLettersData;