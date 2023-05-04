import { Link } from "react-router-dom"
import Card from "../../components/Card"
import Settings from "../Settings/Settings"
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion'

const Main = () => {
    const { t, i18n } = useTranslation()
    return (
        <motion.div
            className="container"
            initial={{ opacity: 0}}
            animate={{ opacity: "100%" }}
            exit={{ translateY: 0 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 30
            }}
        >
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
        </motion.div>
    )
}

export default Main