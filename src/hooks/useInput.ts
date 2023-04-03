import {useCallback,  useEffect, useRef, useState} from "react";

// Проверяет является ли вводимый символ цифрой, буквой, пробелом или бэкспейсом

const isSymbolAllowed = (code: string) => {
	return (
		code.startsWith("Key") ||
		code.startsWith("Digit") ||
		code === "Backspace" ||
		code === "Space"
	);
};

const useInput = (enabled: boolean, text: string) => {
	// Положение курсора
	const [cursor, setCursor] = useState(0);
	// Введенный текст
	const [typed, setTyped] = useState<string>("");
	//Колличество нажатий
	const [totalTypedNumber, setTotalTypedNumber] = useState(0)
	//Колличество правильных нажатий
	const [totalCorrectTypedNumber, setTotalCorrectTypedNumber] = useState(0)
	// Количество введенных символов
	const totalTyped = useRef(0);
	//статистика правильности ввода
	const [accuracy, setAccuracy] = useState(100)

	const [maxTyped , setMaxTyped] = useState(0)
	const currentIndex = typed.split(" ").length - 1

	useEffect(() => setMaxTyped(prevState => Math.max(cursor,prevState)),[cursor])

	const keydownHandler = useCallback(
		({key, code}: KeyboardEvent) => {
			if (!enabled || !isSymbolAllowed(code)) {
				return;
			}

			switch (key) {
				case "Backspace":
					setTyped((prev) => prev.slice(0, -1));
					if (cursor > 0) {
						setCursor((cursor) => cursor - 1);
					}
					if (totalTyped.current > 0) {
						totalTyped.current -= 1;
					}
					break;
				case " ":
					if (typed[typed.length - 1] === " " || text[cursor] != ' ') {
						return
					} else {
						setTyped((prev) => prev.concat(key));
						setCursor((cursor) => cursor + 1);
						totalTyped.current += 1;
					}
					break
				default:
					if (text.split(" ")[currentIndex].length <= typed.split(" ")[currentIndex].length && typed[typed.length - 1]) {
						return
					} else {
						setTyped((prev) => prev.concat(key));
						setCursor((cursor) => cursor + 1);
						totalTyped.current += 1;
					}
					break;
			}
		},
		[cursor, enabled]
	);

	// Очищает введенное и ставит курсор на ноль
	const clearTyped = useCallback(() => {
		setTyped("")
		setCursor(0)
	}, [])

	//пресчет правильности ввода
	useEffect(() => {
		if (maxTyped >= cursor){
			let acc = Math.round((totalCorrectTypedNumber / totalTypedNumber) * 100)
			acc = isNaN(acc) ? 100 : acc
			console.log(maxTyped)

			setAccuracy(acc)
		}
	}, [maxTyped])

	function setTypedNumber(typed: number, correctTyped: number) {
		setTotalTypedNumber(prevState => prevState + typed)
		setTotalCorrectTypedNumber(prevState => prevState + correctTyped)
	}


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

	const restartTyping = () => {
		setCursor(0)
		setTyped('')
		totalTyped.current = 0
	}

	return {
		typed,
		cursor,
		clearTyped,
		resetTotalTyped,
		totalTyped: totalTyped.current,
		restartTyping,
		accuracy,
		setTypedNumber,
		maxTyped
	}
}

export default useInput