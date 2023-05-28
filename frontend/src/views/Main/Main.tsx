import { Link } from "react-router-dom"
import Card from "../../components/Card"
import Settings from "../Settings/Settings"
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion'
import AnimatedContainer from "../../components/AnimatedContainer";

const Main = () => {
    const { t, i18n } = useTranslation()
    return (
        <AnimatedContainer>
            <div
                className="cards__wrapper"
            >
                <Card
                    title={t("main.card1.title")}
                    description={t("main.card1.description")}
                    img={"learning"}
                    url={"typing/learning"}
                />
                <Card
                    title={t("main.card2.title")}
                    description={t("main.card2.description")}
                    img={"infinity"}
                    url={"typing/infinity"}
                />
                <Card
                    title={t("main.card3.title")}
                    description={t("main.card3.description")}
                    img={"timeattack"}
                    url={"typing/timeattack"}
                />
                <Card
                    title={t("None")}
                    description={t("None")}
                    img={"none"}
                    url={"typing/"}
                />
            </div>
        </AnimatedContainer>
    )
}

export default Main