import { FC, useEffect } from 'react';
import './Typing.module.scss'
import Heading from '../../components/Heading/Heading';
import Keyboard from '../../components/Keyboard/Keyboard';
import Input from '../../components/Input/Input';
import CountdownTimer from '../../components/CountdownTimer';
import RestartButton from '../../components/RestartButton';
import UserTypings from '../../components/UserTypings';
import Caret from '../../components/Caret';
import useEngine from '../../hooks/useEngine';

interface TypingProps {
    title: string;
    subtitle: string;
}

const Typing:FC<TypingProps> = ({title, subtitle}) => {
    const {state, words, typed } = useEngine();
    
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
                <UserTypings userInput={typed} words={words}/>
                <Input text={words}/>
            </div>
            <CountdownTimer timeLeft={30}/>
            <Keyboard/>
        </div>
        </>
    )
}
export default Typing