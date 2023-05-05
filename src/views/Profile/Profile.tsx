import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import Heading from '../../components/Heading/Heading'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const src = "https://localhost:7025/tests?userId=3fa85f64-5717-4562-b3fc-2c963f66afa6"
interface Tests{
    wpm: number,
    accuracy: number,
    mode: string,
    date: string,
}


const Profile = () => {
    const { t, i18n } = useTranslation()
    const [tests, setTests] = useState<Tests[]>([]);
    const [avgWpm, setAvgWpm] = useState(0);
    const [bestWpm, setBestWpm] = useState(0);
    const [avgAccuracy, setAvgAccuracy] = useState(0);
    const [bestAccuracy, setBestAccuracy] = useState(0);

    const calculateAvgWpm = () => {
        let totalWpm = 0;
        tests.forEach(test => {
            totalWpm += test.wpm;
        });
        setAvgWpm(Math.round(totalWpm / tests.length));
    }
    const calculateBestWpm = () => {
        let bestWpm = 0;
        tests.forEach(test => {
            bestWpm = bestWpm > test.wpm ? bestWpm : test.wpm;
        });
        setBestWpm(bestWpm);
    }

    const calculateAvgAccuracy = () => {
        let totalAccuracy = 0;
        tests.forEach(test => {
            totalAccuracy += test.accuracy;
        });
        setAvgAccuracy(Math.round((totalAccuracy / tests.length) * 100));
    }

    const calculateBestAccuracy = () => {
        let bestAccuracy = 0;
        tests.forEach(test => {
            bestAccuracy = bestAccuracy > test.accuracy ? bestAccuracy : test.accuracy;
        });
        setBestAccuracy(Math.round(bestAccuracy * 100));
    }

    useEffect(() => {
        calculateAvgWpm();
        calculateBestWpm();
        calculateAvgAccuracy();
        calculateBestAccuracy();
    }, [tests])

    useEffect(() => {
        axios
            .get(src)
            .then(data => {
                setTests(data.data);
            })
    }, [])

    return (
        <motion.div className="container"
            initial={{ opacity: 0}}
            animate={{ opacity: "100%" }}
            exit={{ translateY: 0 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 30
            }}
        >
            <div className='profile__wrapper'>
                <div className='title__section'>
                    <Heading headingLevel={"h1"}>Профиль</Heading>
                </div>
                <div className="main-stats">
                    <div className="main-stat">
                        <Heading headingLevel={"h3"} className="title">{t("profile.average")} {t("typing.wpm")}</Heading>
                        <div className="value">{avgWpm}</div>
                    </div>
                    <div className="main-stat">
                        <Heading headingLevel={"h3"} className="title">{t("typing.accuracy")}</Heading>
                        <div className="value">{avgAccuracy}%</div>
                    </div>
                    {/* <div className="main-stat">
                    <Heading headingLevel={"h3"} className="title">{t("typing.time")}</Heading>
                    <div className="value">26c</div>
                </div>
                <div className="main-stat">
                    <Heading headingLevel={"h3"} className="title">{t("profile.hours_week")}</Heading>
                    <div className="value">2{t("profile.hours")}</div>
                </div> */}
                </div>
                <div className="secondary-stats">
                    <div className="secondary-stat">
                        <div className="title">{t("profile.best_wpm")}</div>
                        <div className="value">{bestWpm}</div>
                    </div>
                    <div className="secondary-stat">
                        <div className="title">{t("profile.best_accuracy")}</div>
                        <div className="value">{bestAccuracy}%</div>
                    </div>
                    {/* <div className="secondary-stat">
                    <div className="title">{t("profile.total_tests")}</div>
                    <div className="value">256</div>
                </div>
                <div className="secondary-stat">
                    <div className="title">{t("profile.total_words")}</div>
                    <div className="value">12932</div>
                </div> */}
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
                            return (
                                <tr>
                                    <td>{test.mode}</td>
                                    <td>{test.wpm}</td>
                                    <td>{Math.round(test.accuracy * 100)}%</td>
                                    <td>{test.date}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </motion.div>
    )
}

export default Profile