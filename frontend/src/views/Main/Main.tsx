import Card from "../../components/Card/Card"
import { useTranslation } from "react-i18next";
import "./Main.scss";
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
                    title={t("main.card4.title")}
                    description={t("main.card4.description")}
                    img={"words"}
                    url={"typing/ammountofwords"}
                />
            </div>
        </AnimatedContainer>
    )
}

export default Main