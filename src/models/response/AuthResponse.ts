import { IUser } from "../IUser";

export interface AuthResponse {
    token: string;
    expiresIn: number;
    user: IUser;
}