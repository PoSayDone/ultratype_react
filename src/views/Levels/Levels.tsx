import React from 'react'
import Heading from '../../components/Heading/Heading'
import { useTranslation } from 'react-i18next'
import ContinueButton from '../../components/ContinueButton'

type Props = {}

const Levels = (props: Props) => {
    const { t, i18n } = useTranslation()
    return (
        <>
            <div className='title__section'>
                <div className="title__section--text">
                    <Heading headingLevel={"h1"}>{t("education.title")}</Heading>
                    <Heading headingLevel={"h3"}>{t("education.selectLevels")}</Heading>
                </div>
                <ContinueButton
                />
            </div>
            <div className='levels__container'>
                <div className='levels'>
                    <div className="levels__heading">
                        <Heading headingLevel={"h2"}>{t("education.levels.firstRow.title")}</Heading>
                    </div>
                    <div className="levels__buttons">
                        <button>{t("education.levels.firstRow.level.0")}</button>
                        <button>{t("education.levels.firstRow.level.0")}</button>
                        <button>{t("education.levels.firstRow.level.0")}</button>
                        <button>{t("education.levels.firstRow.level.0")}</button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Levels