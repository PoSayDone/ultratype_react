import { FC, useEffect, useState } from 'react';
import './Typing.scss';
import Heading from '../../components/Heading/Heading';
import Keyboard from '../../components/Keyboard/Keyboard';
import Input from '../../components/Input/Input';
import CountdownTimer from '../../components/CountdownTimer';
import RestartButton from '../../components/RestartButton';
import useEngine from '../../hooks/useEngine';
import SymbolsTypedMetric from '../../components/SymbolsTypedMetric';
import AccuracyMetric from '../../components/AccuracyMetric';
import { useTranslation } from 'react-i18next';
import Results from '../../components/Results/Results';
import { AnimatePresence, motion } from 'framer-motion';
import AnimatedContainer from '../../components/AnimatedContainer';
import Skeleton from '../../components/Skeleton/Skeleton';
import LearningIndicator from '../../components/LearningIndicator/LearningIndicator';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';

interface TypingProps {
    title?: string;
    subtitle?: string;
}

const Typing: FC<TypingProps> = ({ title, subtitle }) => {
    const { t, i18n } = useTranslation()
    const { timerConst, accuracy, restart, status, words, typed, wpm, time, cursor, currentCharacterRef, mask, mainLetter, leftMargin, setLeftMargin, topMargin, setTopMargin } = useEngine();

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
        "learning": "main.card3.title"
    }

    return (
        <AnimatedContainer>
            <div className="title__section">
                <div className="title__section--text">
                    <Heading headingLevel="h1" className="title">
                        {title ? title : t(dict[mode])}
                    </Heading>
                    <Heading headingLevel="h3" className="subtitle">
                        {subtitle}
                    </Heading>
                </div>
                <RestartButton
                    onRestart={() => restart()}
                />
            </div>
            {
                status != "finish" &&
                <div className="typing__container">
                    {mode == "learning" && <LearningIndicator letterString={mask} mainLetter={mainLetter} />}
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
                        <CountdownTimer timeLeft={time} />
                        <SymbolsTypedMetric wpm={wpm} />
                        <AccuracyMetric accuracy={accuracy} />
                    </div>
                    <Keyboard currentChar={currentChar} />
                </div>
            }
            <AnimatePresence initial={false}>
                {status == 'finish' &&
                    <Results accuracyPercentage={accuracy} wpm={wpm} time={timerConst - time}></Results>}
            </AnimatePresence>
        </AnimatedContainer>
    )
}
export default Typing