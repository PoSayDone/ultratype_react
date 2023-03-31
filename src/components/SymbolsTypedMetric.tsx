type Props = {
    wpm: number;
}

const SymbolsTypedMetric = (props: Props) => {
    return (
        <div className='wpm'>
            <span className="material-symbols-rounded">
                text_snippet
            </span>
            WPM: {Number.isNaN(props.wpm) ? 0 : props.wpm} w/m
        </div>
    )
}

export default SymbolsTypedMetric