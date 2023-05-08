import { Link } from "react-router-dom"
import Card from "../../components/Card"
import Settings from "../Settings/Settings"
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion'
import AnimatedContinaer from "../../components/AnimatedContinaer";

const Main = () => {
    const { t, i18n } = useTranslation()
    return (
        <AnimatedContinaer>
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
                <Card
                    title={t("main.card1.title")}
                    description={t("main.card1.description")}
                    img={"learning"}
                    url={"learning"}
                />
            </div>
        </AnimatedContinaer>
    )
}

export default Main