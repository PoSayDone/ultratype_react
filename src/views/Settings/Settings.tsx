import * as React from 'react';
import './Settings.scss'
import { useState } from 'react';

interface SettingsProps {
    theme: boolean
    setTheme: Function
    language: boolean
    setLanguage: Function
    font: boolean
    setFont: Function
}


const Settings = ({ theme, setTheme, language, setLanguage, font, setFont }: SettingsProps) => {

    function changeTheme(event: React.ChangeEvent<HTMLSelectElement>) {
        setTheme(event.target.value == 'dark' ? true : false)
        console.log(event.target.value);
    }


    function changeLanguage(event: React.ChangeEvent<HTMLSelectElement>) {
        setLanguage(event.target.value == 'ru' ? true : false)
        console.log(event.target.value);
    }

    return (
        <div className="settings">
            <div className="title__section">
                <h1>{language ? 'Настройки' : 'Settings'}</h1>
            </div>
            <div className="interface__section">
                <h2>{language ? 'Интерфейс' : 'Interface'}</h2>
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
                                language?
                                <option value="eng">English</option>
                                : <option value="eng" selected>English</option>
                            }
                            
                        </select>
                    </fieldset>
                    <fieldset name='theme'>
                        <p>{language ? 'Тема' : 'Theme'}</p>
                        <select onChange={changeTheme}>
                            {theme ?
                                <option value="dark" selected>{language ? 'Темная' : 'Dark'}</option>
                                : <option value="dark" >{language ? 'Темная' : 'Dark'}</option>
                            }

                            {theme ?
                                <option value="light">{language ? 'Светлая' : 'Light'}</option>
                                : <option value="light" selected>{language ? 'Светлая' : 'Light'}</option>
                            }


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