import classNames from "classnames"
import "./LearningIndicator.scss"
import AnimatedDiv from "../AnimatedDiv"
import { useTypedSelector } from "../../hooks/useTypedSelector"

interface IndicatorProps {
    letterString: string
    mainLetter: string
}
interface IndicatorItemProps {
    letter: string
    mainLetter: string
    title: string
}

const IndicatorItem = ({ letter, mainLetter, title }: IndicatorItemProps) => {
    return (
        <AnimatedDiv
            title={title}
            className={classNames(
                'learning-indicator__item',
                { 'active': letter === mainLetter }
            )}>
            {letter}
        </AnimatedDiv>
    )
}

const LearningIndicator = ({ letterString, mainLetter }: IndicatorProps) => {
    const letters = useTypedSelector(state => state.letters)

    return (
        <div className="learning-indicator">
            {letterString.split("").map((letter) => {
                return (
                    <IndicatorItem title={
                        `WPM: ${Math.round(letters[letter].wpm).toString()}`+
                        `\nErrorRate: ${Math.round(letters[letter].errorRate * 100).toString()}%`+
                        `\nConfidence: ${Math.round(letters[letter].confidence * 100).toString()}%`
                    } letter={letter} mainLetter={mainLetter}></IndicatorItem>
                )
            })}
        </div>
    )
}

export default LearningIndicator