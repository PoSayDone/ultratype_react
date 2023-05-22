const getTheme = () => {
	const theme = `${window?.localStorage?.getItem('theme')}`
	if (['light', 'dark'].includes(theme)) return theme

	const userMedia = window.matchMedia('(prefers-color-scheme: light)')
	if (userMedia.matches) return 'light'

	return 'dark'
}

function getLanguage(){
	const language = localStorage.getItem("language") || "ru"
	return language == "ru"
}

const getTimerAttackTime = () => {
	const time = localStorage.getItem("timerAttackTime")
	if (time == null ){
		return 125
	}else{
		return +time
	}
}

const getMonospace = () => (localStorage.getItem("isMonospace") == "true" && localStorage.getItem("isMonospace") != null) || false

const getTypingLanguage = () => localStorage.getItem("typingLang") || "en"

export enum SettingsActionsTypes {
	CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
	CHANGE_THEME = "CHANGE_THEME",
	CHANGE_FONT = "CHANGE_FONT",
	SET_TIMEATTACK_TIME = "SET_TIMEATTACK_TIME",
	SET_TYPING_LANGUAGE = "SET_TYPING_LANGUAGE"
}
 interface LanguageActionType {
	type: SettingsActionsTypes.CHANGE_LANGUAGE,
	payload: boolean
}

interface FontActionType{
	type: SettingsActionsTypes.CHANGE_FONT,
}

interface ChangeThemeAction {
    type: SettingsActionsTypes.CHANGE_THEME;
    payload: string;
}

interface SetTimeAttackTime{
	type : SettingsActionsTypes.SET_TIMEATTACK_TIME,
	payload: number
}

interface SetTypingLanguage {
	type: SettingsActionsTypes.SET_TYPING_LANGUAGE,
	payload: string
}

interface IDefaultState{
	isMonospace: boolean
	theme : string
	language : boolean
	timeAttackTime: number
	typingLanguage: string
}

const defaultState : IDefaultState = {
	isMonospace : getMonospace(),
	theme : getTheme(),
	language : getLanguage(),
	timeAttackTime : getTimerAttackTime(),
	typingLanguage: getTypingLanguage()
}

export type SettingsActions = LanguageActionType | FontActionType | ChangeThemeAction | SetTimeAttackTime | SetTypingLanguage

export default function settingsReducer(state = defaultState , action : SettingsActions) : IDefaultState{
	switch(action.type){
		case SettingsActionsTypes.CHANGE_LANGUAGE:
			return{
				...state,
				language: action.payload
			}
		case SettingsActionsTypes.CHANGE_THEME:
			return{
				...state,
				theme: action.payload
			}
		case SettingsActionsTypes.CHANGE_FONT:
			return{
				...state,
				isMonospace: !state.isMonospace
			}
		case SettingsActionsTypes.SET_TIMEATTACK_TIME:
			return{
				...state,
				timeAttackTime: action.payload
			}
		case SettingsActionsTypes.SET_TYPING_LANGUAGE:
			return{
				...state,
				typingLanguage: action.payload
			}
			default:
				return state
	}
}