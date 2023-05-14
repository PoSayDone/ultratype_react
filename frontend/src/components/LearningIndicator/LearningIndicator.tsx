import classNames from "classnames"
import "./LearningIndicator.scss"

interface IndicatorProps {
    letterString: string
    mainLetter: string
}
interface IndicatorItemProps {
    letter: string
    mainLetter: string
}

const IndicatorItem = ({ letter, mainLetter }: IndicatorItemProps) => {
    return (
        <div className={classNames(
            'learning-indicator__item',
            { 'active': letter === mainLetter }
        )}>{letter}</div>
    )
}

const LearningIndicator = ({ letterString, mainLetter }: IndicatorProps) => {
    return (
        <div className="learning-indicator">
            {letterString.split("").map((letter) => {
                return (
                    <IndicatorItem letter={letter} mainLetter={mainLetter}></IndicatorItem>
                )
            })}
        </div>
    )
}

export default LearningIndicator