export type State = "start" | "run" | "finish" | "restart";

interface IStatusState{
	status : State
}

export interface StatusActionType{
	type: "CHANGE_STATE",
    payload: State
}

const defaultState : IStatusState = {
	status : "start"
}

export const statusReducer = (state : IStatusState = defaultState, action : StatusActionType) : IStatusState => {
	switch (action.type) {
		case "CHANGE_STATE":
            return {
                ...state,
                status: action.payload
            };
		default:
			return state
	}
}