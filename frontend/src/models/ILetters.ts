export interface ILetters {
    [key: string]: {
        [key: string]: {
            wpm: number,
            errorRate: number,
            confidence: number,
            typedCounter: number,
            errorCounter: number,
            timeElapsed: number,
        }
    }
}