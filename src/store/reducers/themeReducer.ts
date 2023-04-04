import { isHtmlElement } from "react-router-dom/dist/dom";

export type Theme = "dark" | "light";

interface IThemeState {
    theme: Theme;
}

export interface FontActionType {
    type: "CHANGE_THEME";
    payload: Theme;
}

const defaultState: IThemeState = {
    theme: "dark"
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
