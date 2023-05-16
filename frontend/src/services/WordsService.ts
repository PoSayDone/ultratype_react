import $api from "../http";
import {AxiosResponse} from 'axios';
import { IWords } from "../models/IWords";

export default class WordsService {
    static fetchWords(mask: string, mainChar: string , len: number): Promise<AxiosResponse<IWords>> {
        return $api.get<IWords>(`/words/${mask}/${mainChar}/${len}`)
    }

    static fetchRandomWords(len : number) : Promise<AxiosResponse<IWords>>{
        return $api.get<IWords>(`/words/random/${len}`)
    }
}