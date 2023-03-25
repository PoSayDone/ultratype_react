import { Link } from "react-router-dom"
import Card from "../components/Card"

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