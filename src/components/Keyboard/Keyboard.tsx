import "./Keyboard.module.scss";
import data from "./Keyboard.module.json";
import {useEffect, useState} from "react";

interface KeyboardProps {
	currentCharacterRef: React.RefObject<HTMLSpanElement>
	currentChar: string
}

const Keyboard = ({currentCharacterRef, currentChar}: KeyboardProps) => {

	const [isUpperCase, setIsUpperCase] = useState(false);

	// Обработка нажатия и отпускания клавиш
	useEffect(() => {
		document.addEventListener('keydown', detectKeyDown, true)
		document.addEventListener('keyup', detectKeyUp, true)
	}, [])

	// Обработка нажатия шифта
	const detectKeyDown = (e: any) => {
		// Проверяет нажат ли именно шифт
		if (e.key === 'Shift') {
			// Меняет значение у переменной isUpperCase
			setIsUpperCase(true)
		}
	}

	// Обработка отпускания шифта
	const detectKeyUp = (e: any) => {
		// Проверяет нажат ли именно шифт
		if (e.key === 'Shift') {
			// Меняет значение у переменной isUpperCase
			setIsUpperCase(false)
		}
	}

	return (
		<div className="keyboard">
			<div className="keyboard__row r1">
				{/* Проходится по всем элементам первого ряда из json файла */}
				{data.qwerty.keys.row1.map((key: string) => {
					return (
						// Возвращает div с значением data-key из json
						<div className={
							currentChar === key.slice(-1) || currentChar === key.slice(0, -1) ? 'keyboard__button active' : 'keyboard__button'}
						     data-key={key}>
							{/* Если isUpperCase true, то берет значение из первого элемента строки, иначе второго  */}
							{isUpperCase ? key.slice(-1) : key.slice(0, -1)}
						</div>
					)
				})}
				<div className="keyboard__button backspace">
					<span className="material-symbols-rounded">backspace</span>
				</div>
			</div>
			<div className="keyboard__row r2">
				<div className="keyboard__button tab">
					<span className="material-symbols-rounded">keyboard_tab</span>
				</div>
				{/* Проходится по всем элементам второго ряда из json файла */}
				{data.qwerty.keys.row2.map((key: string) => {
					return (
						// Возвращает div с значением data-key из json
						<div className={
							currentChar === key.slice(-1) || currentChar === key.slice(0, -1) ? 'keyboard__button active' : 'keyboard__button'
						}
						     data-key={key}>
							{/* Если isUpperCase true, то берет значение из первого элемента строки, иначе второго  */}
							{isUpperCase ? key.slice(-1) : key.slice(0, -1)}
						</div>
					)
				})}
			</div>
			<div className="keyboard__row r3">
				<div className="keyboard__button caps">
					<span className="material-symbols-rounded">keyboard_capslock</span>
				</div>
				{/* Проходится по всем элементам третьего ряда из json файла */}
				{data.qwerty.keys.row3.map((key: string) => {
					return (
						// Возвращает div с значением data-key из json
						<div className={
							currentChar === key.slice(-1) || currentChar === key.slice(0, -1) ? 'keyboard__button active' : 'keyboard__button'
						}
						     data-key={key}>
							{/* Если isUpperCase true, то берет значение из первого элемента строки, иначе второго  */}
							{isUpperCase ? key.slice(-1) : key.slice(0, -1)}
						</div>
					)
				})}
				<div className="keyboard__button enter">
					<span className="material-symbols-rounded">keyboard_return</span>
				</div>
			</div>
			<div className="keyboard__row r4">
				<div className={
					currentChar === currentChar.toUpperCase() && currentChar!= ' ' ? 'keyboard__button active shift' : 'shift keyboard__button'
				}>
					<span className="material-symbols-rounded">shift</span>
				</div>
				{/* Проходится по всем элементам четвертого ряда из json файла */}
				{data.qwerty.keys.row4.map((key: string) => {
					return (
						// Возвращает div с значением data-key из json
						<div className={
							currentChar === key.slice(-1) || currentChar === key.slice(0, -1) ? 'keyboard__button active' : 'keyboard__button'
						}
						     data-key={key}>
							{/* Если isUpperCase true, то берет значение из первого элемента строки, иначе второго  */}
							{isUpperCase ? key.slice(-1) : key.slice(0, -1)}
						</div>
					)
				})}
				<div className="keyboard__button shift">
					<span className="material-symbols-rounded">shift</span>
				</div>
			</div>
			<div className="keyboard__row r5">
				<div className="keyboard__button"></div>
				<div className="keyboard__button"></div>
				<div className="keyboard__button"></div>
				<div className={
					currentChar === ' ' ? 'keyboard__button active space' : ' space keyboard__button'
				}></div>
				<div className="keyboard__button"></div>
				<div className="keyboard__button"></div>
				<div className="keyboard__button"></div>
				<div className="keyboard__button"></div>
			</div>
		</div>
	)
}

export default Keyboard