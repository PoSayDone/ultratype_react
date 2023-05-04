import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import Heading from '../../components/Heading/Heading'
import axios from 'axios'

const src = "http://localhost:5206/tests/?userId=3fa85f64-5717-4562-b3fc-2c963f66afa6"

const Profile = () => {
    const [tests, setTests] = useState([]);

    useEffect(() => {
        axios
            .get(src)
            .then(data => {
                setTests(data.data);
            })
    }, [])

    return (
        <div className='profile__container'>
            <div className='title__section'>
                <Heading headingLevel={"h1"}>Профиль</Heading>
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
            <table className="tests-list">
                <thead>
                    <tr>
                        <td>mode</td>
                        <td>wpm</td>
                        <td>accuracy</td>
                        <td>date</td>
                    </tr>
                </thead>
                <tbody>
                    {tests.map(test => {
                        return(
                            <tr>
                                <td>{test.mode}</td>                                
                                <td>{test.wpm}</td>                                
                                <td>{test.accuracy}</td>                                
                                <td>{test.date}</td>                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Profile