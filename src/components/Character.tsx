import classNames from "classnames";
import {forwardRef} from "react";

// Пропсы для символа
type CharacterProps = {
	// Символ введенный пользователем (может быть undefined, так как пользователь может еще не ввести этот символ)
	actual?: any;
	// Эталонное значение символа
	expected: string;
}


// Компонент символа
const Character = forwardRef((props: CharacterProps, ref) => {

	// Проверяет является ли символ введенная пользователем правильным
	const isCorrect = props.actual === props.expected;
	// Проверяет является ли символ не введенным
	const isNull = props.actual === undefined || props.actual === null;
	// Проверяет является ли символ пробелом
	const isWhitespace = props.expected === " ";

	// Возвращаем span с буквой
	return (
		<div
			className={
				classNames({ // используем модуль classnames для conditional классов
					"letter": props.actual === undefined, // Для символа, который еще не ввел пользователь
					"letter__correct": isCorrect && !isWhitespace, // Для правильного символа
					"letter__incorrect": !isCorrect && !isWhitespace && !isNull, // Для неправильного символа
					'whitespace': isWhitespace,
				})}
			ref={ref as React.RefObject<HTMLDivElement>}
		>{props.expected}</div>
	)
})

export default Character