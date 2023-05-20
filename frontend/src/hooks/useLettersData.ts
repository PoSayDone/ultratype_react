import { useDispatch } from "react-redux";
import { useTypedSelector } from "./useTypedSelector";
import { LetterActionTypes } from "../store/reducers/letterReducer";
import { useEffect, useState } from "react";

const useLettersData = () => {
    const letters = useTypedSelector((state) => state.letters);
    const dispatch = useDispatch();

    const storedLettersToAdd = localStorage.getItem("userLettersToAdd");
    const [lettersToAdd, setLettersToAdd] = useState<string>("");

    useEffect(() => {
        if (
            storedLettersToAdd === null ||
            JSON.parse(storedLettersToAdd) === ""
        ) {
            setLettersToAdd("sauodychgmpbkvwfzxqj");
        } else setLettersToAdd(JSON.parse(storedLettersToAdd));
    }, []);

    const [mask, setMask] = useState<string>("");
    const [mainLetter, setMainLetter] = useState<string>("");

    const addLetter = () => {
        console.log(lettersToAdd[0]);
        dispatch({
            type: LetterActionTypes.ADD_LETTER,
            payload: { letter: lettersToAdd[0] },
        });
        setLettersToAdd(lettersToAdd.slice(1));
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
            console.log(lettersToAdd);
            const keys = Object.keys(letters);
            return keys[keys.length - 1];
        }
        return minLetter;
    };

    const updateLetters = () => {
        setMainLetter(findMainLetter());
        setMask(Object.keys(letters).join(""));
        localStorage.setItem("userLetters", JSON.stringify(letters));
        console.log(lettersToAdd);
        if (lettersToAdd !== "")
            localStorage.setItem(
                "userLettersToAdd",
                JSON.stringify(lettersToAdd)
            );
    };

    useEffect(() => {
        updateLetters();
    }, []);

    return { updateLetters, mask, mainLetter };
};
export default useLettersData;
