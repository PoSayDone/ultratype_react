import classNames from "classnames"
import "./LearningIndicator.scss"
import AnimatedDiv from "../AnimatedDiv"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { CSSProperties, StyleHTMLAttributes } from "react"

interface IndicatorProps {
    letterString: string
    mainLetter: string
}
interface IndicatorItemProps {
    letter: string
    mainLetter: string
    title: string
    style: CSSProperties
}

const IndicatorItem = ({ letter, mainLetter, title, style }: IndicatorItemProps) => {
    return (
        <AnimatedDiv
            title={title}
            style={style}
            className={'learning-indicator__item'}
        >
            {letter}
        </AnimatedDiv>
    )
}

const LearningIndicator = ({ letterString, mainLetter }: IndicatorProps) => {
    let typingLang = useTypedSelector(state => state.settings.typingLanguage)
    const letters = useTypedSelector(state => state.letters[typingLang])
    return (
        <div className="learning-indicator__container">
            <div className="learning-indicator__text">
                All keys:
            </div>
            <div className="learning-indicator__chars">
                {letterString.split("").map((letter) => {
                    const color = Math.round(letters[letter].confidence * 100)
                    return (
                        <IndicatorItem
                            title={`WPM: ${Math.round(letters[letter].wpm).toString()}` +
                                `\nErrorRate: ${Math.round(letters[letter].errorRate * 100).toString()}%` +
                                `\nConfidence: ${Math.round(letters[letter].confidence * 100).toString()}%`}
                            letter={letter}
                            style={{ background: `hsl(${color},61%,64%)` }}
                            mainLetter={mainLetter}
                        />
                    )
                })}
            </div >
            <div className="learning-indicator__text">
                Main char:
            </div>
            <div className="learning-indicator__main-char">
                <IndicatorItem letter={mainLetter} mainLetter={""} title={""} style={{ background: "var(--accent)" }}/>
            </div>
        </div>
    )
}

export default LearningIndicator