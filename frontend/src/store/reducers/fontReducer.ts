interface IFontState{
	isMonospace : boolean
}

export interface FontActionType{
	type: "CHANGE_FONT",
}

const defaultState : IFontState = {
	isMonospace : false
}

export const fontReducer = (state : IFontState = defaultState, action : FontActionType) : IFontState => {
	switch (action.type) {
		case "CHANGE_FONT":
			return {...state, isMonospace: !state.isMonospace}
		default:
			return state
	}
}