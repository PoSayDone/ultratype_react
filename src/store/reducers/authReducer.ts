export enum AuthAction {
    SET_USER_DATA = "SET_USER_DATA"
}

interface SetUserData {
    type: AuthAction.SET_USER_DATA,
    payload: {
        username: string,
        token: string
    }
}

interface AuthState {
    username: string,
    token: string
}

const defaultState: AuthState = {
    username: "",
    token: ""
}

export type AuthActions = | SetUserData
export function authReducer(state = defaultState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthAction.SET_USER_DATA:
            return {
                ...state,
                token: action.payload.token,
                username: action.payload.username
            }
        default:
            return state;
    }
}