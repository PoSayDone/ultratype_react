import { FC, useEffect } from 'react';
import './Typing.module.scss'
import Heading from '../../components/Heading/Heading';
import Keyboard from '../../components/Keyboard/Keyboard';
import Input from '../../components/Input/Input';
import CountdownTimer from '../../components/CountdownTimer';
import RestartButton from '../../components/RestartButton';
import Caret from '../../components/Caret';
import useEngine from '../../hooks/useEngine';
import SymbolsTypedMetric from '../../components/SymbolsTypedMetric';
import AccuracyMetric from '../../components/AccuracyMetric';

interface TypingProps {
    title: string;
    subtitle: string;
}

const Typing: FC<TypingProps> = ({ title, subtitle }) => {
    const { state, words, typed, wpm, seconds, cursor } = useEngine();

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
                    onRestart={() => null}
                />
            </div>
            <div className="typing__container">
                <div className="input__section">
                    <Input text={words} userText={typed} cursorPosition={cursor} />
                </div>
                <div className="typing__metrics">
                    <CountdownTimer timeLeft={seconds} />
                    <SymbolsTypedMetric wpm={wpm} />
                    <AccuracyMetric accuracy={100} />
                </div>
                <Keyboard />
            </div>
        </>
    )
}
export default Typing