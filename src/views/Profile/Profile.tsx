import React from 'react'
import "./Profile.scss"
import Heading from '../../components/Heading/Heading'

const Profile = () => {
    return (
            <div className='profile__container'>
                <div className='title__section'>
                    <Heading headingLevel={"h2"}>Профиль</Heading>
                </div>
                <div className="main-stats">
                    <div className="main-stat">
                        <Heading headingLevel={"h3"} className="title">Cр. СВМ</Heading>
                        <div className="value">72</div>
                    </div>
                    <div className="main-stat">
                        <Heading headingLevel={"h3"} className="title">Точность</Heading>
                        <div className="value">96%</div>
                    </div>
                    <div className="main-stat">
                        <Heading headingLevel={"h3"} className="title">Время</Heading>
                        <div className="value">26s</div>
                    </div>
                    <div className="main-stat">
                        <Heading headingLevel={"h3"} className="title">Часов за нед.</Heading>
                        <div className="value">2h</div>
                    </div>
                </div>
                <div className="secondary-stats">
                    <div className="secondary-stat">
                        <div className="title">Лучший wpm</div>
                        <div className="value">84</div>
                    </div>
                    <div className="secondary-stat">
                        <div className="title">Лучшая Точность</div>
                        <div className="value">92%</div>
                    </div>
                    <div className="secondary-stat">
                        <div className="title">Всего тестов</div>
                        <div className="value">256</div>
                    </div>
                    <div className="secondary-stat">
                        <div className="title">Всего слов</div>
                        <div className="value">12932</div>
                    </div>
                </div>
            </div>
    )
}

export default Profile