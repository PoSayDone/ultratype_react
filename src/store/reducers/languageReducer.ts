interface IDefaultState {
	language: boolean
}

export interface LanguageActionType {
	type: "CHANGE_LANGUAGE",
	payload: boolean
}

const defaultState: IDefaultState = {
	language: true
}

export const languageReducer = (state = defaultState, action: LanguageActionType): IDefaultState => {
	switch (action.type) {
		case "CHANGE_LANGUAGE":
			return {...state, language: action.payload}
		default:
			return state
	}
}

