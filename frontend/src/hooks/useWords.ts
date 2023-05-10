import { useEffect, useState } from "react";
import WordsService from "../services/WordsService";

interface letter {
    letter: string,
    wpm: number,
    errorRate: number,
    confidence: number,
}
const useWords = () => {

    const goodConfidence = 1
    const [availableLetters, SetAvailableLetters] = useState<letter[]>([
        { letter: "e", wpm: 0, errorRate: 0, confidence: 0 },
        { letter: "n", wpm: 0, errorRate: 0, confidence: 0 },
        { letter: "i", wpm: 0, errorRate: 0, confidence: 0 },
        { letter: "t", wpm: 0, errorRate: 0, confidence: 0 },
        { letter: "r", wpm: 0, errorRate: 0, confidence: 0 },
        { letter: "l", wpm: 0, errorRate: 0, confidence: 0 }
    ]);
    const [lettersToAdd, setLettersToAdd] = useState<string[]>("s".split(""))
    const [words, setWords] = useState<string>("");

    // Высчитываем то, как хорошо пользователь управляется с буквой
    const calculateConfidence = (errorRate: number, wpm: number) => {
        const errorFactor = (1 - errorRate) / 100
        const wpmFactor = wpm / 100
        return errorFactor * wpmFactor
    }

    const findMainLetter = (): string => {
        let minConfidence = goodConfidence
        let tempLetter = availableLetters[0]
        availableLetters.forEach(letter => {
            if (letter.confidence <= minConfidence) {
                minConfidence = letter.confidence
                tempLetter = letter
            }
        });
        if (minConfidence >= goodConfidence) {
            addLetter()
            if (availableLetters.at(-1) !== undefined) {
                availableLetters.at(-1)?.letter
            }
        }
        return tempLetter.letter
    }

    const addLetter = () => {
        const newLetter: letter = { letter: lettersToAdd[0], wpm: 0, errorRate: 0, confidence: 0 }
        SetAvailableLetters([...availableLetters, newLetter])
        setLettersToAdd(lettersToAdd.slice(1))
    }

    const generateWordsTutorial = async (mask: string, mainChar: string) => {
        const response = await WordsService.fetchWords(mask, mainChar);
        setWords(response.data.Strings.join(" "))
    }

    useEffect(() => {
        generateWordsTutorial("enitrl", "e")
    }, []);

    return words
}

export default useWords