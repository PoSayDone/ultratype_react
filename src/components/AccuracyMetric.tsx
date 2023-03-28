type Props = {
    accuracy: number;
}

const AccuracyMetric = (props: Props) => {
    return (
        <div className='accuracy'>
            <span className="material-symbols-rounded">
                spellcheck
            </span>
            Accuracy: {props.accuracy}%
        </div>
    )
}

export default AccuracyMetric