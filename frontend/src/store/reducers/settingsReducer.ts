const getTheme = () => {
	const theme = `${window?.localStorage?.getItem('theme')}`
	if (['light', 'dark'].includes(theme)) return theme

	const userMedia = window.matchMedia('(prefers-color-scheme: light)')
	if (userMedia.matches) return 'light'

	return 'dark'
}

export enum SettingsActionsTypes {
	CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
	CHANGE_THEME = "CHANGE_THEME",
	CHANGE_FONT = "CHANGE_FONT",
	SET_TIMEATTACK_TIME = "SET_TIMEATTACK_TIME",
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

interface IDefaultState{
	isMonospace: boolean
	theme : string
	language : boolean
	timeAttackTime: number
}

const defaultState : IDefaultState = {
	isMonospace : false,
	theme : getTheme(),
	language : true,
	timeAttackTime : 120
}

export type SettingsActions = LanguageActionType | FontActionType | ChangeThemeAction | SetTimeAttackTime

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
			default:
				return state
	}
}