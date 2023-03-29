import { useCallback, useEffect, useRef, useState } from "react";

// Проверяет является ли вводимый символ цифрой, буквой, пробелом или бэкспейсом
const isSymbolAllowed = (code: string) => {
    return (
        code.startsWith("Key") ||
        code.startsWith("Digit") ||
        code === "Backspace" ||
        code === "Space"
    );
};

const useTypings = (enabled: boolean) => {
    // Положение курсора
    const [cursor, setCursor] = useState(0);
    // Введенный текст
    const [typed, setTyped] = useState<string>("");
    // Количество введенных символов
    const totalTyped = useRef(0);

    const keydownHandler = useCallback(
        ({ key, code }: KeyboardEvent) => {
            if (!enabled || !isSymbolAllowed(code)) {
                return;
            }

            switch (key) {
                case "Backspace":
                    setTyped((prev) => prev.slice(0, -1));
                    setCursor((cursor) => cursor - 1);
                    if (totalTyped.current > 0) {
                        totalTyped.current -= 1;
                    }
                    break;
                default:
                    setTyped((prev) => prev.concat(key));
                    setCursor((cursor) => cursor + 1);
                    totalTyped.current += 1;
            }
        },
        [cursor, enabled]
    );

    // Очищает введенное и ставит курсор на ноль
    const clearTyped = useCallback(() => {
        setTyped("")
        setCursor(0)
    }, [])

    // Сбрасывает количество введенных символов
    const resetTotalTyped = useCallback(() => {
        totalTyped.current = 0
    }, [])

    // Добавляет и убирает eventListner'ы
    useEffect(() => {
        window.addEventListener("keydown", keydownHandler)
        return () => {
            window.removeEventListener("keydown", keydownHandler)
        }
    }, [keydownHandler])

    return {
        typed,
        cursor,
        clearTyped,
        resetTotalTyped,
        totalTyped: totalTyped.current,
    }
}

export default useTypings