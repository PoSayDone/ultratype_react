import { IUser } from "../../models/IUser"

export enum UserAction {
    SET_USER = "SET_USER"
}

interface setUser {
    type: UserAction.SET_USER,
    payload: IUser
}

const defaultState: IUser = {
    id: "",
    email: "",
    username: ""
}

export type UserActions = | setUser

export function userReducer(state = defaultState, action: UserActions): IUser {
    switch (action.type) {
        case UserAction.SET_USER:
            return {
                ...state,
                id: action.payload.id,
                email: action.payload.email,
                username: action.payload.username
            }
        default:
            return state;
    }
}