const getTheme = () => {
    const theme = `${window?.localStorage?.getItem('theme')}`
    if (['light', 'dark'].includes(theme)) return theme

    const userMedia = window.matchMedia('(prefers-color-scheme: light)')
    if (userMedia.matches) return 'light'

    return 'dark'
}

interface IThemeState {
    theme: string;
}

export interface FontActionType {
    type: "CHANGE_THEME";
    payload: string;
}

const defaultState: IThemeState = {
    theme: getTheme()
};

export const themeReducer = (
    state: IThemeState = defaultState,
    action: FontActionType
): IThemeState => {
    switch (action.type) {
        case "CHANGE_THEME":
            return {
                ...state,
                theme: action.payload
            };
        default:
            return state;
    }
};