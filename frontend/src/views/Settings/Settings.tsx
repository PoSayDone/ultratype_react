import {useState} from 'react';
import Heading from '../../components/Heading/Heading';
import {TFunction} from 'i18next';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import AnimatedContainer from '../../components/AnimatedContainer';
import {Dispatch} from 'redux';
import {SettingsActions, SettingsActionsTypes} from '../../store/reducers/settingsReducer';

interface SettingsProps {
    text: TFunction<"translation", undefined, "translation">
}

const Settings = ({ text }: SettingsProps) => {
    const {language,isMonospace,theme , timeAttackTime, typingLanguage} = useTypedSelector(state => state.settings)
    const dispatch : Dispatch<SettingsActions> = useDispatch()
    const [timeAttackValue, setTimeAttackValue] = useState(`${timeAttackTime}`)
    const changeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const theme_value = event.target.value //проверка языка
        dispatch({ type: SettingsActionsTypes.CHANGE_THEME, payload: theme_value })
    };
    console.log(typingLanguage)


    function changeLanguage(event: React.ChangeEvent<HTMLSelectElement>) {
        const lang = event.target.value === 'ru' //проверка языка
        dispatch({ type: SettingsActionsTypes.CHANGE_LANGUAGE, payload: lang })
    }

    const ChangeTimeAttackTimeValue = (event: React.ChangeEvent<HTMLInputElement>) =>{
        if (event.target.value == ""){
            setTimeAttackValue("0")
        }else{
            let value = event.target.value[0] === "0" && event.target.value.length!=1 ? event.target.value.slice(1) : event.target.value
            setTimeAttackValue(value)
        }
    }

    const ChangeTimeAttackTime = (event: React.FocusEvent<HTMLInputElement>) => {
        dispatch({type: SettingsActionsTypes.SET_TIMEATTACK_TIME, payload: +event.target.value <1 ? 1 : +event.target.value})
    }

    function changeTypingLanguage(event: React.ChangeEvent<HTMLSelectElement>){
        localStorage.setItem("userLetters","")
        localStorage.setItem("userLettersToAdd","")
        dispatch({type:SettingsActionsTypes.SET_TYPING_LANGUAGE,payload:event.target.value})
    }

    return (
        <AnimatedContainer>
            <div className="settings">
                <div className="title__section">
                    <Heading headingLevel="h1">{text("settings.title")}</Heading>
                </div>
                <div className="interface__section">
                    <Heading headingLevel="h2">{text("settings.interface")}</Heading>
                    <form name='settings'>
                        <fieldset name='language'>
                            <p>{text("settings.language")}</p>
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
                            <p>{text("settings.theme")}</p>
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
                            <p>{text("settings.font")}</p>
                            <div className={isMonospace ? 'slider right' : 'slider left'}
                                onClick={() => dispatch({ type: SettingsActionsTypes.CHANGE_FONT })}></div>
                        </fieldset>
                        <Heading headingLevel={"h2"}>Язык печати</Heading>
                        <fieldset name='typingLanguage'>
                            <p>{text("settings.language")}</p>
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
                        <Heading headingLevel={"h2"}>{text("settings.timeAttack")}</Heading>
                        <fieldset name='timeAttack'>
                            <p>{text("settings.timeAttackTime")}</p>
                            <input type="number" name="timeAttacktime" value={timeAttackValue} onChange={ChangeTimeAttackTimeValue} onBlur={ChangeTimeAttackTime}/>
                        </fieldset>

                    </form>
                </div>
            </div>
        </AnimatedContainer>
    );
}

export default Settings