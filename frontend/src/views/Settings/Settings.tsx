import { useEffect } from 'react';
import Heading from '../../components/Heading/Heading';
import { TFunction } from 'i18next';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { motion } from 'framer-motion';
import AnimatedContainer from '../../components/AnimatedContainer';

interface SettingsProps {
    text: TFunction<"translation", undefined, "translation">
}

const Settings = ({ text }: SettingsProps) => {
    const language = useTypedSelector(state => state.language.language)
    const font: boolean = useTypedSelector(state => state.font.isMonospace)
    const dispatch = useDispatch()
    const theme = useTypedSelector(state => state.theme.theme)

    const changeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const theme_value = event.target.value //проверка языка
        dispatch({ type: "CHANGE_THEME", payload: theme_value })
    };

    function changeLanguage(event: React.ChangeEvent<HTMLSelectElement>) {
        const lang = event.target.value === 'ru' //проверка языка
        dispatch({ type: "CHANGE_LANGUAGE", payload: lang })
    }

    return (
        <AnimatedContainer>
            <div className="settings">
                <div className="title__section">
                    <Heading headingLevel="h1">{text("settings.title")}</Heading>
                </div>
                <div className="interface__section">
                    <Heading headingLevel="h2">{text("settings.interface")}</Heading>
                    <form name='setting'>
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
                            <div className={font ? 'slider right' : 'slider left'}
                                onClick={() => dispatch({ type: "CHANGE_FONT" })}></div>
                        </fieldset>
                    </form>
                </div>
            </div>
        </AnimatedContainer>
    );
}

export default Settings;