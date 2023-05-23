import { useState } from 'react';
import Heading from '../../components/Heading/Heading';
import { TFunction } from 'i18next';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import AnimatedContainer from '../../components/AnimatedContainer';
import { Dispatch } from 'redux';
import { SettingsActions, SettingsActionsTypes } from '../../store/reducers/settingsReducer';

interface SettingsProps {
    text: TFunction<"translation", undefined, "translation">
}

const Settings = ({ text }: SettingsProps) => {
    const { language, isMonospace, theme, timeAttackTime, typingLanguage } = useTypedSelector(state => state.settings)
    const dispatch: Dispatch<SettingsActions> = useDispatch()
    const [timeAttackValue, setTimeAttackValue] = useState(`${timeAttackTime}`)
    const changeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const theme_value = event.target.value //проверка языка
        dispatch({ type: SettingsActionsTypes.CHANGE_THEME, payload: theme_value })
    };

    function changeLanguage(event: React.ChangeEvent<HTMLSelectElement>) {
        const lang = event.target.value === 'ru' //проверка языка
        dispatch({ type: SettingsActionsTypes.CHANGE_LANGUAGE, payload: lang })
        localStorage.setItem("language", event.target.value)
    }

    const ChangeTimeAttackTimeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value == "") {
            setTimeAttackValue("0")
        } else {
            let value = event.target.value[0] === "0" && event.target.value.length != 1 ? event.target.value.slice(1) : event.target.value
            setTimeAttackValue(value)
        }
    }

    const ChangeTimeAttackTime = (event: React.FocusEvent<HTMLInputElement>) => {
        dispatch({ type: SettingsActionsTypes.SET_TIMEATTACK_TIME, payload: +event.target.value < 1 ? 1 : +event.target.value })
        localStorage.setItem("timerAttackTime", `${+event.target.value < 1 ? 1 : +event.target.value}`)
    }

    function changeTypingLanguage(event: React.ChangeEvent<HTMLSelectElement>) {
        dispatch({ type: SettingsActionsTypes.SET_TYPING_LANGUAGE, payload: event.target.value })
        localStorage.setItem("typingLang", event.target.value)
    }

    return (
        <AnimatedContainer>
            <div className="settings">
                <Heading headingLevel="h1">{text("settings.title")}</Heading>
                <form name='settings'>
                    <div className="settings__section">
                        <Heading headingLevel="h2">{text("settings.interface")}</Heading>
                        <fieldset name='language'>
                            <span>{text("settings.language")}</span>
                            <select onChange={changeLanguage}>
                                {
                                    language
                                        ? <option value="ru" selected>Русский</option>
                                        : <option value="ru">Русский</option>

                                }
                                {
                                    language
                                        ? <option value="eng">English</option>
                                        : <option value="eng" selected>English</option>
                                }

                            </select>
                        </fieldset>
                        <fieldset name='theme'>
                            <span>{text("settings.theme")}</span>
                            <select onChange={changeTheme}>
                                {
                                    theme === 'dark'
                                        ? <option value="dark" selected>{language ? 'Темная' : 'Dark'}</option>
                                        : <option value="dark">{language ? 'Темная' : 'Dark'}</option>
                                }
                                {
                                    theme === 'light'
                                        ? <option value="light" selected>{language ? 'Светлая' : 'Light'}</option>
                                        : <option value="light">{language ? 'Светлая' : 'Light'}</option>
                                }

                            </select>
                        </fieldset>
                        <fieldset name='font'>
                            <span>{text("settings.font")}</span>
                            <div className={isMonospace ? 'slider right' : 'slider left'}
                                onClick={() => {
                                    dispatch({ type: SettingsActionsTypes.CHANGE_FONT })
                                    localStorage.setItem("isMonospace", `${isMonospace}`)
                                    console.log(`${isMonospace}`);
                                }}></div>
                        </fieldset>
                    </div>
                    <div className='settings__section'>
                        <Heading headingLevel={"h2"}>Язык печати</Heading>
                        <fieldset name='typingLanguage'>
                            <span>{text("settings.language")}</span>
                            <select onChange={changeTypingLanguage}>
                                {
                                    typingLanguage == "ru"
                                        ? <option value="ru" selected>Русский</option>
                                        : <option value="ru">Русский</option>

                                }
                                {
                                    typingLanguage == "ru"
                                        ? <option value="en">English</option>
                                        : <option value="en" selected>English</option>
                                }

                            </select>
                        </fieldset>
                    </div>
                    <div className='settings__section'>
                        <Heading headingLevel={"h2"}>{text("settings.timeAttack")}</Heading>
                        <fieldset name='timeAttack'>
                            <span>{text("settings.timeAttackTime")}</span>
                            <input type="number" name="timeAttacktime" value={timeAttackValue} onChange={ChangeTimeAttackTimeValue} onBlur={ChangeTimeAttackTime} />
                        </fieldset>
                    </div>
                </form>
            </div>
        </AnimatedContainer >
    );
}

export default Settings