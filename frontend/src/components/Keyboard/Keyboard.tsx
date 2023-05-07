import "./Keyboard.module.scss";
import data from "./Keyboard.module.json";
import { useEffect, useState } from "react";
import classNames from "classnames";

interface KeyboardProps {
    currentChar: string
}

interface KeyboardButtonProps {
    value: string,
    isUpperCase: boolean,
    setIsUpperCase: any,
    currentChar: string,
}

const KeyboardButton = ({ currentChar, value, isUpperCase, setIsUpperCase }: KeyboardButtonProps) => {
    return (
        <div
            className={
                classNames(
                    "keyboard__button",
                    {
                        "active": currentChar === value.slice(-1) || currentChar === value.slice(0, -1),
                    }
                )
            }
            data-key={value}
        >
            {isUpperCase ? value.slice(-1) : value.slice(0, -1)}
        </div>
    )
}


const Keyboard = ({ currentChar }: KeyboardProps) => {

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
                {
                    data.qwerty.keys.row1.map((key, index) =>
                        <KeyboardButton
                            value={key}
                            isUpperCase={isUpperCase}
                            setIsUpperCase={setIsUpperCase}
                            currentChar={currentChar}
                        />
                    )
                }
                <div className="keyboard__button backspace">
                    <span className="material-symbols-rounded">backspace</span>
                </div>
            </div>
            <div className="keyboard__row r2">
                <div className="keyboard__button tab">
                    <span className="material-symbols-rounded">keyboard_tab</span>
                </div>
                {/* Проходится по всем элементам второго ряда из json файла */}
                {data.qwerty.keys.row2.map((key: string) =>
                    <KeyboardButton
                        value={key}
                        isUpperCase={isUpperCase}
                        setIsUpperCase={setIsUpperCase}
                        currentChar={currentChar}
                    />
                )}
            </div>
            <div className="keyboard__row r3">
                <div className="keyboard__button caps">
                    <span className="material-symbols-rounded">keyboard_capslock</span>
                </div>
                {/* Проходится по всем элементам третьего ряда из json файла */}
                {data.qwerty.keys.row3.map((key: string) =>
                    <KeyboardButton
                        value={key}
                        isUpperCase={isUpperCase}
                        setIsUpperCase={setIsUpperCase}
                        currentChar={currentChar}
                    />
                )}
                <div className="keyboard__button enter">
                    <span className="material-symbols-rounded">keyboard_return</span>
                </div>
            </div>
            <div className="keyboard__row r4">
                <div className={
                    currentChar && currentChar === currentChar.toUpperCase() && currentChar != ' ' ? 'keyboard__button active shift' : 'shift keyboard__button'
                }>
                    <span className="material-symbols-rounded">shift</span>
                </div>
                {/* Проходится по всем элементам четвертого ряда из json файла */}
                {data.qwerty.keys.row4.map((key: string) =>
                    <KeyboardButton
                        value={key}
                        isUpperCase={isUpperCase}
                        setIsUpperCase={setIsUpperCase}
                        currentChar={currentChar}
                    />
                )}
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