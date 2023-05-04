import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import Heading from '../../components/Heading/Heading'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const src = "http://localhost:5206/tests/"

const Profile = () => {
    const {t, i18n} = useTranslation()
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
                    <Heading headingLevel={"h3"} className="title">{t("profile.average")} {t("typing.wpm")}</Heading>
                    <div className="value">72</div>
                </div>
                <div className="main-stat">
                    <Heading headingLevel={"h3"} className="title">{t("typing.accuracy")}</Heading>
                    <div className="value">96%</div>
                </div>
                <div className="main-stat">
                    <Heading headingLevel={"h3"} className="title">{t("typing.time")}</Heading>
                    <div className="value">26c</div>
                </div>
                <div className="main-stat">
                    <Heading headingLevel={"h3"} className="title">{t("profile.hours_week")}</Heading>
                    <div className="value">2{t("profile.hours")}</div>
                </div>
            </div>
            <div className="secondary-stats">
                <div className="secondary-stat">
                    <div className="title">{t("profile.best_wpm")}</div>
                    <div className="value">84</div>
                </div>
                <div className="secondary-stat">
                    <div className="title">{t("profile.best_accuracy")}</div>
                    <div className="value">92%</div>
                </div>
                <div className="secondary-stat">
                    <div className="title">{t("profile.total_tests")}</div>
                    <div className="value">256</div>
                </div>
                <div className="secondary-stat">
                    <div className="title">{t("profile.total_words")}</div>
                    <div className="value">12932</div>
                </div>
            </div>
            <table className="tests-list">
                <thead>
                    <tr>
                        <td>{t("profile.mode")}</td>
                        <td>{t("typing.wpm")}</td>
                        <td>{t("typing.accuracy")}</td>
                        <td>{t("profile.date")}</td>
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