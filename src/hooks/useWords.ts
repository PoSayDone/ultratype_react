import {faker} from '@faker-js/faker';
import {Dispatch, useCallback} from 'react';
import {NUMBER_OF_WORDS, WordsActions, WordsActionTypes} from "../store/reducers/wordsReducer";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "./useTypedSelector";

const generateWords = (count: number) => {
    return faker.random.words(count).toLowerCase()
}

const useWords = () => {
    const dispatch : Dispatch<WordsActions> = useDispatch()
    const {words} = useTypedSelector(state => state.words)
    // dispatch({type: WordsActionTypes.SET_WORDS, payload: generateWords(count)})
    // const [words, setWords] = useState<string>(generateWords(count))

    const updateWords = useCallback(() => {
        // setWords(generateWords(count));
        dispatch({type: WordsActionTypes.SET_WORDS, payload: generateWords(NUMBER_OF_WORDS)})
    }, [NUMBER_OF_WORDS])
    
    return {words, updateWords}
}

export default useWords