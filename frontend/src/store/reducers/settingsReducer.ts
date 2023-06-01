const getTheme = () => {
    const theme = `${window?.localStorage?.getItem('theme')}`
    if (['light', 'dark'].includes(theme)) return theme

    const userMedia = window.matchMedia('(prefers-color-scheme: light)')
    if (userMedia.matches) return 'light'

    return 'dark'
}

function getLanguage() {
    const language = localStorage.getItem("language") || "ru"
    return language == "ru"
}

const getTimerAttackTime = () => {
    const time = localStorage.getItem("timerAttackTime")
    if (time == null) {
        return 30
    } else {
        return +time
    }
}

const getWordsValue = (): number => {
    const words = localStorage.getItem("number_of_words")
    if (words == null) {
        return 30
    } else {
        return +words
    }
}

const getMonospace = () => (localStorage.getItem("isMonospace") == "true" && localStorage.getItem("isMonospace") != null) || false

const getTypingLanguage = () => localStorage.getItem("typingLang") || "en"

export enum SettingsActionsTypes {
    CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
    CHANGE_THEME = "CHANGE_THEME",
    CHANGE_FONT = "CHANGE_FONT",
    SET_TIMEATTACK_TIME = "SET_TIMEATTACK_TIME",
    SET_TYPING_LANGUAGE = "SET_TYPING_LANGUAGE",
    SET_NUBMER_OF_WORDS = "SET_NUBMER_OF_WORDS"
}
interface LanguageActionType {
    type: SettingsActionsTypes.CHANGE_LANGUAGE,
    payload: boolean
}

interface FontActionType {
    type: SettingsActionsTypes.CHANGE_FONT,
}

interface ChangeThemeAction {
    type: SettingsActionsTypes.CHANGE_THEME;
    payload: string;
}

interface SetTimeAttackTime {
    type: SettingsActionsTypes.SET_TIMEATTACK_TIME,
    payload: number
}

interface SetTypingLanguage {
    type: SettingsActionsTypes.SET_TYPING_LANGUAGE,
    payload: string
}

interface SetWordsValue {
    type: SettingsActionsTypes.SET_NUBMER_OF_WORDS,
    payload: number
}

interface IDefaultState {
    isMonospace: boolean
    theme: string
    language: boolean
    timeAttackTime: number
    numberOfWords: number
    typingLanguage: string
}

const defaultState: IDefaultState = {
    isMonospace: getMonospace(),
    theme: getTheme(),
    language: getLanguage(),
    timeAttackTime: getTimerAttackTime(),
    numberOfWords: getWordsValue(),
    typingLanguage: getTypingLanguage()
}

export type SettingsActions = LanguageActionType | FontActionType | ChangeThemeAction | SetTimeAttackTime | SetTypingLanguage | SetWordsValue

export default function settingsReducer(state = defaultState, action: SettingsActions): IDefaultState {
    switch (action.type) {
        case SettingsActionsTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }
        case SettingsActionsTypes.CHANGE_THEME:
            return {
                ...state,
                theme: action.payload
            }
        case SettingsActionsTypes.CHANGE_FONT:
            return {
                ...state,
                isMonospace: !state.isMonospace
            }
        case SettingsActionsTypes.SET_TIMEATTACK_TIME:
            return {
                ...state,
                timeAttackTime: action.payload
            }
        case SettingsActionsTypes.SET_TYPING_LANGUAGE:
            return {
                ...state,
                typingLanguage: action.payload
            }
        case SettingsActionsTypes.SET_NUBMER_OF_WORDS:
            return {
                ...state,
                numberOfWords: action.payload
            }
        default:
            return state
    }
}
