import { FC, useEffect, useState } from 'react';
import './Typing.scss';
import Heading from '../../components/Heading/Heading';
import Keyboard from '../../components/Keyboard/Keyboard';
import Input from '../../components/Input/Input';
import RestartButton from '../../components/RestartButton';
import useEngine from '../../hooks/useEngine';
import AccuracyMetric from '../../components/Metrics/AccuracyMetric';
import { useTranslation } from 'react-i18next';
import Results from '../../components/Results/Results';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedContainer from '../../components/AnimatedContainer';
import Skeleton from '../../components/Skeleton/Skeleton';
import LearningIndicator from '../../components/LearningIndicator/LearningIndicator';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import WordsMetric from '../../components/Metrics/WordsMetric';
import TimerMetric from '../../components/Metrics/TimerMetric';
import WpmMetric from '../../components/Metrics/WpmMetric';

interface TypingProps {
    title?: string;
    subtitle?: string;
}

const Typing: FC<TypingProps> = ({ title }) => {
    const { t, i18n } = useTranslation()
    const { timerConst, accuracy, restart, status, words, typed, wpm, time, cursor, currentCharacterRef, lettersData } = useEngine();

    const [currentChar, setCurrentChar] = useState(words[0])
    const mode = useParams().mode || "learning"
    useEffect(() => {
        setCurrentChar(words[cursor])
    }, [words, cursor])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: "CHANGE_LAST_MODE", payload: mode })
    }, [])
    // 

    interface IDict {
        [key: string]: string
    }

    const dict: IDict = {
        "infinity": "main.card2.title",
        "timeattack": "main.card3.title",
        "learning": "main.card3.title",
        "numberofwords": "main.card4.title"
    }

    return (
        <AnimatedContainer>
            <div className="title__section">
                <div className="title__section--text">
                    <Heading headingLevel="h1" className="title">
                        {title ? title : t(dict[mode])}
                    </Heading>
                </div>
                <RestartButton
                    onRestart={() => restart()}
                />
            </div>
            {
                status != "finish" &&
                <div className="typing__container">
                    {mode == "learning" && <LearningIndicator letterString={lettersData.mask} mainLetter={lettersData.mainLetter} />}
                    {mode == "numberofwords" && <WordsMetric totalWords={words.split(" ").length} typedWords={typed.split(" ").length - 1} />}
                    <AnimatePresence>
                        <div className="typing__input">
                            {
                                words === ""
                                    ? <><Skeleton height={24} style={{ marginTop: "5px" }}></Skeleton><Skeleton height={24} style={{ marginTop: "6px" }}></Skeleton></>
                                    : <Input text={words} userText={typed} cursorPosition={cursor} currentCharacterRef={currentCharacterRef} state={status} />
                            }
                        </div>
                    </AnimatePresence>
                    <div className="typing__metrics">
                        {mode !== "numberofwords" && <TimerMetric timeLeft={time} />}
                        <WpmMetric wpm={wpm} />
                        <AccuracyMetric accuracy={accuracy} />
                    </div>
                    <Keyboard currentChar={currentChar} />
                </div>
            }
            <AnimatePresence initial={false}>
                {status == 'finish' &&
                    <Results
                        accuracyPercentage={accuracy}
                        wpm={wpm}
                        time={mode === "timeattack" ? timerConst - time : time}
                    />}
            </AnimatePresence>
        </AnimatedContainer >
    )
}
export default Typing