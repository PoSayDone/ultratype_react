import * as React from 'react';
import {Dispatch, useContext} from 'react';
import {ThemeContext} from '../../contexts/ThemeContext';
import Heading from '../../components/Heading/Heading';
import { TFunction } from 'i18next';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {LanguageActionType} from "../../store/reducers/languageReducer";
import {FontActionType} from "../../store/reducers/fontReducer";

interface SettingsProps {
	text: TFunction<"translation" , undefined , "translation">
}

const Settings = ({text}: SettingsProps) => {
	const {theme, setTheme} = useContext(ThemeContext);
	const language = useTypedSelector(state => state.language.language)
	const dispatch: Dispatch<LanguageActionType | FontActionType> = useDispatch()
	const font : boolean = useTypedSelector(state => state.font.isMonospace)


	const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setTheme(event.target.value);
	};


	function changeLanguage(event: React.ChangeEvent<HTMLSelectElement>) {
		const lang =  event.target.value === 'ru' //проверка языка
		dispatch({type: "CHANGE_LANGUAGE", payload : lang})
	}

	return (
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
						<select onChange={handleThemeChange}>
							{
								theme === 'dark'
									? <option value="dark" selected>{language ? 'Темная' : 'Dark'}</option>
									: <option value="dark">{language ? 'Темная' : 'Dark'}</option>
							}
							{
								theme === 'light'
									? <option value="light" selected>{language ? 'Светлая' : 'Light'}</option>
									:  <option value="light">{language ? 'Светлая' : 'Light'}</option>
							}

						</select>
					</fieldset>
					<fieldset name='font'>
						<p>{text("settings.font")}</p>
						<div className={font ? 'slider right' : 'slider left'}
						     onClick={() => dispatch({type:"CHANGE_FONT"})}></div>
					</fieldset>
				</form>
			</div>
		</div>
	);
}

export default Settings;