export interface ILetter {
    [key: string]: {
        wpm: number,
        errorRate: number,
        confidence: number,
        typedCounter: number,
        errorCounter: number
    };
}