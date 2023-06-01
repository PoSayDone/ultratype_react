import { useTranslation } from "react-i18next";
import "./Metric.scss";

type Props = {
    timeLeft: number;
}

const TimerMetric = ({timeLeft}: Props) => {
    const {t, i18n} = useTranslation()
    const seconds = timeLeft % 60
    const minutes = (timeLeft - seconds) / 60
    const resultString = minutes === 0 ? `${seconds}` : `${minutes}:${seconds}`
    return (
        <div className='metric timer'>
            <span className="material-symbols-rounded">
                timelapse
            </span>
            {t("typing.time")}: {resultString}
        </div>
    )
}

export default TimerMetric