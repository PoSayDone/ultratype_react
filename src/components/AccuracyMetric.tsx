import { useTranslation } from "react-i18next";

type Props = {
    accuracy: number;
}

const AccuracyMetric = (props: Props) => {
    const {t, i18n} = useTranslation()
    return (
        <div className='accuracy'>
            <span className="material-symbols-rounded">
                spellcheck
            </span>
            {t("typing.accuracy")}: {props.accuracy}%
        </div>
    )
}

export default AccuracyMetric