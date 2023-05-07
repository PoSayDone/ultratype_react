import { useTranslation } from "react-i18next";

type Props = {
    timeLeft: number;
}

const CountdownTimer = (props: Props) => {
    const {t, i18n} = useTranslation()
    return (
        <div className='timer'>
            <span className="material-symbols-rounded">
                timelapse
            </span>
            {t("typing.time")}: {props.timeLeft}
        </div>
    )
}

export default CountdownTimer