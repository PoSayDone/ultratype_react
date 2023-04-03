import { FC, useEffect, useState } from 'react';
import './Typing.module.scss'
import Heading from '../../components/Heading/Heading';
import Keyboard from '../../components/Keyboard/Keyboard';
import Input from '../../components/Input/Input';
import CountdownTimer from '../../components/CountdownTimer';
import RestartButton from '../../components/RestartButton';
import useEngine from '../../hooks/useEngine';
import SymbolsTypedMetric from '../../components/SymbolsTypedMetric';
import AccuracyMetric from '../../components/AccuracyMetric';

interface TypingProps {
    title: string;
    subtitle: string;
}

const Typing: FC<TypingProps> = ({ title, subtitle }) => {
    const {accuracy, restart,state, words, typed, wpm, timeLeft, cursor , currentCharacterRef } = useEngine();
    const [currentChar, setCurrentChar] = useState(words[0])

    useEffect(() => {
        setCurrentChar(words[cursor])
    }, [words, cursor])
    return (
        <>
            <div className="title__section">
                <div className="title__section--text">
                    <Heading headingLevel="h1" className="title">
                        {title}
                    </Heading>
                    <Heading headingLevel="h3" className="subtitle">
                        {subtitle}
                    </Heading>
                </div>
                <RestartButton
                    onRestart={() => restart()}

                />
            </div>
            <div className="typing__container">
                <div className="input__section">
                    <Input text={words} userText={typed} cursorPosition={cursor} currentCharacterRef={currentCharacterRef} state={state}  />
                </div>
                <div className="typing__metrics">
                    <CountdownTimer timeLeft={timeLeft} />
                    <SymbolsTypedMetric wpm={wpm} />
                    <AccuracyMetric accuracy={accuracy } />
                </div>
                <Keyboard currentChar={currentChar} />
            </div>
        </>
    )
}
export default Typing