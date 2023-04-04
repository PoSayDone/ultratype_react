import { Link } from "react-router-dom"
import Card from "../components/Card"
import Settings from "./Settings/Settings"
import { useTranslation } from "react-i18next";

const Main = () => {
    return (
        <>
            <div className="cards__wrapper">
                <Card
                    title={"Обучение"}
                    description={"Пройдите тщательно составленный обучающиий курс, который улучшит ваши навыки"}
                    img={"learning"}
                    url={"learning"}
                />
                <Card
                    title={"Обучение"}
                    description={"Пройдите тщательно составленный обучающиий курс, который улучшит ваши навыки"}
                    img={"learning"}
                    url={"learning"}
                />
                <Card
                    title={"Обучение"}
                    description={"Пройдите тщательно составленный обучающиий курс, который улучшит ваши навыки"}
                    img={"learning"}
                    url={"learning"}
                />
                <Card
                    title={"Обучение"}
                    description={"Пройдите тщательно составленный обучающиий курс, который улучшит ваши навыки"}
                    img={"learning"}
                    url={"learning"}
                />
            </div>
        </>
    )
}

export default Main