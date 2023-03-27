import * as React from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import Heading from '../../components/Heading/Heading';

interface SettingsProps {
    language: boolean
    setLanguage: Function
    font: boolean
    setFont: Function
}

const Settings = ({ language, setLanguage, font, setFont }: SettingsProps) => {
    const { theme, setTheme } = useContext(ThemeContext);  

    const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(event.target.value);
    };

    function changeLanguage(event: React.ChangeEvent<HTMLSelectElement>) {
        setLanguage(event.target.value == 'ru' ? true : false)
        console.log(event.target.value);
    }

    return (
        <div className="settings">
            <div className="title__section">
                <Heading headingLevel="h1">{language ? 'Настройки' : 'Settings'}</Heading>
            </div>
            <div className="interface__section">
                <Heading headingLevel="h2">{language ? 'Интерфейс' : 'Interface'}</Heading>
                <form name='setting'>
                    <fieldset name='language'>
                        <p>{language ? 'Язык' : 'Language'}</p>
                        <select onChange={changeLanguage}>
                            {
                                language ?
                                    <option value="ru" selected>Русский</option>
                                    : <option value="ru" >Русский</option>

                            }
                            {
                                language ?
                                    <option value="eng">English</option>
                                    : <option value="eng" selected>English</option>
                            }

                        </select>
                    </fieldset>
                    <fieldset name='theme'>
                        <p>{language ? 'Тема' : 'Theme'}</p>
                        <select onChange={handleThemeChange}>
                            <option value="dark" selected>{language ? 'Темная' : 'Dark'}</option>
                            <option value="light">{language ? 'Светлая' : 'Light'}</option>
                        </select>
                    </fieldset>
                    <fieldset name='font'>
                        <p>{language ? 'Моноширный шрифт' : 'Monospase font'}</p>
                        <div className={font ? 'slider right' : 'slider left'} onClick={() => setFont((prev: any) => !prev)}></div>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default Settings;