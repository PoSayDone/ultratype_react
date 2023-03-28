import { useState } from "react";
import useWords from "./useWords";
import useTypings from "./useTypings";

export type State = "start" | "run" | "finish"

const NUMBER_OF_WORDS = 12;

const useEngine = () => {
    const [state, setState] = useState<State>("start");
    const { words, updateWords } = useWords(NUMBER_OF_WORDS)
    const { typed, cursor, clearTyped, resetTotalTyped, totalTyped } = useTypings(state !== 'finish')
    return{state, words, typed}
}

export default useEngine;