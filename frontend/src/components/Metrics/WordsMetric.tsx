import { useTranslation } from "react-i18next";
import "./Metric.scss";

type Props = {
    totalWords: number;
    typedWords: number;
}

const WordsMetric = (props: Props) => {
    const { t, i18n } = useTranslation()
    return (
        <div className='metric words'>
            <span className="material-symbols-rounded">
                notes
            </span>
            {t("typing.words")}: {Number.isNaN(props.typedWords) ? 0 : props.typedWords} / {props.totalWords}
        </div>
    )
}

export default WordsMetric