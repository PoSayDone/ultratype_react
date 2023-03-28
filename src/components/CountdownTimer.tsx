type Props = {
    timeLeft: number;
}

const CountdownTimer = (props: Props) => {
    return (
        <div className='timer'>
            <span className="material-symbols-rounded">
                timelapse
            </span>
            Time: {props.timeLeft}
        </div>
    )
}

export default CountdownTimer