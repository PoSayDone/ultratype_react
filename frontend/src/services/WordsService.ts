import $api from "../http";
import {AxiosResponse} from 'axios';
import { IWords } from "../models/IWords";
import {useTypedSelector} from "../hooks/useTypedSelector";

export default class WordsService {
    static fetchWords(mask: string, mainChar: string , len: number , lang: string): Promise<AxiosResponse<IWords>> {
        return $api.get<IWords>(`/words/${lang}/${mask}/${mainChar}/${len}`)
    }

    static fetchRandomWords(len : number, lang: string) : Promise<AxiosResponse<IWords>>{
        return $api.get<IWords>(`/words/${lang}/random/${len}`)
    }
}