import $api from "../http";
import {AxiosResponse} from 'axios';
import { ITest } from "../models/ITest";

export default class TestsService {
    static fetchTests(): Promise<AxiosResponse<ITest[]>> {
        return $api.get<ITest[]>('/tests/getTests')
    }
    
    static addTest(mode: string, wpm: number, accuracy: number): Promise<AxiosResponse> {
        return $api.post<AxiosResponse>('/tests/addTest', { mode, wpm, accuracy })
    }
}