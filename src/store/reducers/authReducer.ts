
export enum AuthAction{
	SET_AUTH = "SET_AUTH"
}

interface SetAuthAction{
	type: AuthAction.SET_AUTH,
	value: boolean
}

interface AuthState{
	isAuth: boolean
}
const defaultState : AuthState = {
	isAuth: false
}
export function authReducer(state = defaultState, action: SetAuthAction){
	switch (action.type){
		case AuthAction.SET_AUTH:
			return {
				isAuth : action.value
			}
		default:
			return state;
	}
}