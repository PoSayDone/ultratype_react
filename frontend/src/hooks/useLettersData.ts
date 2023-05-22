import { useDispatch } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";
import { LetterActionTypes, LetterActions } from "../store/reducers/letterReducer";
import { Dispatch, useCallback, useEffect, useState } from "react";

const useLettersData = () => {
    const typedLang = useTypedSelector(state => state.settings.typingLanguage)
    const letters = useTypedSelector((state) => state.letters[typedLang]);
    const dispatch: Dispatch<LetterActions> = useDispatch();

    const storageLettersToAdd = localStorage.getItem(`${typedLang}UserLettersToAdd`)
    const constLetters = typedLang == "en" ? "sauodychgmpbkvwfzxqj" : "йцукгшщзхъфывпрлджэячсмьбю"
    const [lettersToAdd, setLettersToAdd] = useState<string>(storageLettersToAdd ? storageLettersToAdd : constLetters);

    const [mask, setMask] = useState<string>("");
    const [mainLetter, setMainLetter] = useState<string>("");

    const addLetter = () => {
        dispatch({
            type: LetterActionTypes.ADD_LETTER,
            payload: { lang: typedLang, letter: lettersToAdd[0] },
        });
        setLettersToAdd(prevLettersToAdd => prevLettersToAdd.substring(1));
    };

    const findMainLetter = () => {
        const goodConfidence = 1;
        let minConfidence = goodConfidence;
        let minLetter = "";
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
        if (minConfidence >= goodConfidence) {
            addLetter();
            const keys = Object.keys(letters);
            return keys[keys.length - 1];
        }
        return minLetter;
    };

    const updateLetters = () => {
        setMainLetter(findMainLetter());
        setMask(Object.keys(letters).join(""));
        localStorage.setItem(`${typedLang}UserLetters`, JSON.stringify(letters));
        localStorage.setItem(`${typedLang}UserLettersToAdd`, lettersToAdd);
    };

    useEffect(() => {
        updateLetters();
    }, [])

    return { updateLetters, mask, mainLetter };
};
export default useLettersData;
