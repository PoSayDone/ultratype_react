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
                    url={"levels"}
                />
                <Card
                    title={t("main.card2.title")}
                    description={t("main.card2.description")}
                    img={"infinity"}
                    url={"typing/infinity"}
                />
                <Card
                    title={t("main.card1.title")}
                    description={t("main.card1.description")}
                    img={"learning"}
                    url={"learning"}
                />
                <Card
                    title={t("main.card1.title")}
                    description={t("main.card1.description")}
                    img={"learning"}
                    url={"learning"}
                />
            </div>
        </AnimatedContainer>
    )
}

export default Main