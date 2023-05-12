import "./LearningIndicator.scss"

interface IndicatorItemProps {
    letter: string
}

const IndicatorItem = ({ letter }: IndicatorItemProps) => {
    return (
        <div className='learning-indicator__item'>{letter}</div>
    )
}

const LearningIndicator = () => {
    return (
        <div className="learning-indicator">
            <IndicatorItem letter="a"></IndicatorItem>
            <IndicatorItem letter="b"></IndicatorItem>
            <IndicatorItem letter="c"></IndicatorItem>
            <IndicatorItem letter="d"></IndicatorItem>
        </div>
    )
}

export default LearningIndicator