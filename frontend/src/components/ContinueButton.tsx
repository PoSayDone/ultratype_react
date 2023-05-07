import { useTranslation } from "react-i18next"

const ContinueButton = () => {
    const { t, i18n } = useTranslation()
    return (
        <button className="button continue__button">
            {t("education.continueButton")}
            <span className="material-symbols-rounded">
                arrow_right_alt
            </span>
        </button>
    )
}

export default ContinueButton