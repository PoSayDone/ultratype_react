import { useTranslation } from "react-i18next";
import "./Metric.scss";

type Props = {
    accuracy: number;
}

const AccuracyMetric = (props: Props) => {
    const {t, i18n} = useTranslation()
    return (
        <div className='metric accuracy'>
            <span className="material-symbols-rounded">
                spellcheck
            </span>
            {t("typing.accuracy")}: {props.accuracy}%
        </div>
    )
}

export default AccuracyMetric