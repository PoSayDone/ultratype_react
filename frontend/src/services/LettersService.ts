import $api from "../http";
import { AxiosResponse } from 'axios';
import { LettersResponse } from "../models/response/LettersResponse";
import { ILetters } from "../models/ILetters";

export default class LettersService {
    static getLetters(): Promise<AxiosResponse<LettersResponse>> {
        return $api.get<LettersResponse>(`/letters/getLetters`)
    }
    static setLetters(letters: ILetters): Promise<AxiosResponse<LettersResponse>> {
        return $api.post<LettersResponse>(`/letters/setLetters`, { data: letters })
    }
}