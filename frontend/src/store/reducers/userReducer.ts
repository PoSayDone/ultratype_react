import { IUser } from "../../models/IUser"

export enum UserAction {
    SET_USER = "SET_USER",
    CLEAR_USER = "CLEAR_USER"
}

interface setUser {
    type: UserAction.SET_USER,
    payload: IUser
}

interface clearUser{
    type: UserAction.CLEAR_USER,
}

const defaultState: IUser = {
    id: "",
    email: "",
    username: ""
}

export type UserActions = clearUser | setUser

export function userReducer(state = defaultState, action: UserActions): IUser {
    switch (action.type) {
        case UserAction.SET_USER:
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                username: action.payload.username
            }
        case UserAction.CLEAR_USER:
            return defaultState
        default:
            return state;
    }
}