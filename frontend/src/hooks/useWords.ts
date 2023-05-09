import { useState } from "react";

interface letter {
    letter: string,
    wpm: number,
    errorRate: number,
    confidence: number,
}
const useWords = () => {
    const goodConfidence = 1
    const [availableLetters, SetAvailableLetters] = useState<letter[]>([]);
    const [lettersToAdd, setLettersToAdd] = useState<string[]>("ghijklmnopqrstuvwxyz".split(""))

    // Высчитываем то, как хорошо пользователь управляется с буквой
    const calculateConfidence = (errorRate: number, wpm: number) => {
        const errorFactor = (1 - errorRate) / 100
        // Используем wpm за весь тест, не будем пытаться высчитывать его для конкретной буквы
        const wpmFactor = wpm / 100
        return errorFactor * wpmFactor
    }

    const findMainLetter = () => {
        let minConfidence = goodConfidence
        let tempLetter = null
        availableLetters.forEach(letter => {
            if (letter.confidence < minConfidence) {
                minConfidence = letter.confidence
                tempLetter = letter
            }
        });
        if (minConfidence >= goodConfidence) {
            addLetter()
            return availableLetters.at(-1)
        }
        return tempLetter
    }

    const addLetter = () => {
        const newLetter: letter = { letter: lettersToAdd[0], wpm: 0, errorRate: 0, confidence: 0 }
        SetAvailableLetters([...availableLetters, newLetter])
        setLettersToAdd(lettersToAdd.slice(1))
    }

    function generateWordsTutorial(numWords: number) {
        const words: string[] = [];
        const mainLetter = findMainLetter()?.letter;
        for (let i = 0; i < numWords; i++) {
            const wordLength = Math.floor(Math.random() * 6) + 1; // длина слова от 1 до 10
            let word = "";
            for (let j = 0; j < wordLength; j++) {
                // выбираем случайную букву из набора
                const randomIndex = Math.floor(Math.random() * availableLetters.length);
                const letter = availableLetters[randomIndex];
                if (j === 0) {
                    // в первую позицию ставим главную букву
                    word += mainLetter;
                } else {
                    word += letter.letter;
                }
            }
            words.push(word);
        }
        return words;
    }
    const words = generateWordsTutorial(20)
    return words
}

export default useWords