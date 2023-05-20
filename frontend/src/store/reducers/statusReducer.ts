export type State = "start" | "run" | "finish" | "restart";

interface IStatusState{
	status : State,
	lastMode : string | null
}

export interface StatusActionType{
	type: "CHANGE_STATE",
    payload: State
}

interface LastModeActionType{
	type: "CHANGE_LAST_MODE",
	payload: string
}

const defaultState : IStatusState = {
	status : "start",
	lastMode: null
}

export const statusReducer = (state : IStatusState = defaultState, action : StatusActionType | LastModeActionType) : IStatusState => {
	switch (action.type) {
		case "CHANGE_STATE":
            return {
                ...state,
                status: action.payload
            };
			case "CHANGE_LAST_MODE":
				return{
					...state,
					lastMode: action.payload
				}
		default:
			return state
	}
}