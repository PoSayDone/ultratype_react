import { FC } from "react"
import { Link } from "react-router-dom"
import "./Card.scss";

// Описывает типы, которые может принимать функция
interface CardProps {
    title: string,
    description: string,
    img: string,
    url: string,
}

function getIllustartionUrl(img: string) {
    return new URL(`../../assets/cards_illustrations/${img}.png`, import.meta.url).href
}

const Card: FC<CardProps> = ({ title, description, img, url }) => {
    return (
        <>
            <Link to={`/${url}`} className="card">
                <img src={getIllustartionUrl(img)} className="card__img" />

                <div className="card__text">
                    <div className="card__title">
                        {title}
                    </div>
                    <div className="card__description">
                        {description}
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Card