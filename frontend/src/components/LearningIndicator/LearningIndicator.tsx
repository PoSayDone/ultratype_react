import "./LearningIndicator.scss"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { CSSProperties } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

interface IndicatorProps {
    letterString: string
    mainLetter: string
}
interface IndicatorItemProps {
    letter: string
    title: string
    style: CSSProperties
}

const IndicatorItem = ({ letter, title, style }: IndicatorItemProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: "100%" }}
            transition={{
                duration: 0.6
            }}
            title={title}
            style={style}
            className={'learning-indicator__item'}
        >
            {letter}
        </motion.div>
    )
}

const LearningIndicator = ({ letterString, mainLetter }: IndicatorProps) => {
    let typingLang = useTypedSelector(state => state.settings.typingLanguage)
    const letters = useTypedSelector(state => state.letters[typingLang])
    const { t, i18n } = useTranslation()
    return (
        <div className="learning-indicator__container">
            <div className="learning-indicator__text">
                {t("typing.all_keys")}:
            </div>
            <div className="learning-indicator__chars">
                {letterString.split("").map((letter) => {
                    const color = Math.round(letters[letter].confidence * 100)
                    return (
                        <IndicatorItem
                            title={`${t("typing.wpm")} ${Math.round(letters[letter].wpm).toString()}` +
                                `\n${t("typing.error_rate")}: ${Math.round(letters[letter].errorRate * 100).toString()}%` +
                                `\n${t("typing.confidence")}: ${Math.round(letters[letter].confidence * 100).toString()}%`}
                            letter={letter}
                            style={{ background: `hsl(${color},61%,64%)` }}
                        />
                    )
                })}
            </div >
            <div className="learning-indicator__text">
                {t("typing.main_key")}:
            </div>
            <div className="learning-indicator__main-char">
                <IndicatorItem letter={mainLetter} title={""} style={{ background: "var(--accent)" }} />
            </div>
        </div>
    )
}

export default LearningIndicator