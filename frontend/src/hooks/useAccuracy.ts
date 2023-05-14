import { useEffect, useState } from "react";

const useAccuracy = (originalText: string, typedText: string, index: number): number => {
    const [accuracy, setAccuracy] = useState<number>(0);

    useEffect(() => {
        // Если пользователь еще не ввел ни одного символа, точность равна 0.
        if (index === 0) {
            setAccuracy(100);
            return;
        }

        // Сравниваем пользовательский ввод с оригинальным текстом до индекса последнего введенного символа.
        const incorrectCount = typedText.split('').filter((char, i) => char !== originalText.charAt(i)).length;
        const accuracy = ((typedText.length - incorrectCount) / typedText.length) * 100;

        setAccuracy(accuracy);
    }, [originalText, typedText, index]);

    return Math.round(accuracy);
};

export default useAccuracy;