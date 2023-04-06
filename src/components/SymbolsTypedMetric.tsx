import { useTranslation } from "react-i18next";

type Props = {
    wpm: number;
}

const SymbolsTypedMetric = (props: Props) => {
    const {t, i18n} = useTranslation()
    return (
        <div className='wpm'>
            <span className="material-symbols-rounded">
                text_snippet
            </span>
            {t("typing.wpm")}: {Number.isNaN(props.wpm) ? 0 : props.wpm} w/m
        </div>
    )
}

export default SymbolsTypedMetric