import { useEffect, useState } from 'react'
import "./Profile.scss"
import Heading from '../../components/Heading/Heading'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { useIsAuthenticated } from 'react-auth-kit'
import { ITest } from '../../models/ITest'
import TestsService from '../../services/TestsService'
import Skeleton from '../../components/Skeleton/Skeleton'
import AnimatedDiv from '../../components/AnimatedDiv'
import AnimatedContainer from '../../components/AnimatedContainer'

const Profile = () => {
    const isAuthenticated = useIsAuthenticated();
    const { t, i18n } = useTranslation()
    const [tests, setTests] = useState<ITest[]>([]);
    const [avgWpm, setAvgWpm] = useState(0);
    const [bestWpm, setBestWpm] = useState(0);
    const [avgAccuracy, setAvgAccuracy] = useState(0);
    const [bestAccuracy, setBestAccuracy] = useState(0);
    const [tableIsVisible, setTableIsVisible] = useState(false)
    const MotionSkeleton = motion(Skeleton, { forwardMotionProps: true })

    useEffect(() => {
        updateTests()
        setTableIsVisible(true)
    }, [isAuthenticated])

    const updateTests = async () => {
        try {
            const response = await TestsService.fetchTests();
            setTests(response.data.reverse())
        }
        catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

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


    return (
        <AnimatedContainer>
            <div className='profile__wrapper'>
                <div className='title__section'>
                    <Heading headingLevel={"h1"}>{t("profile.title")}</Heading>
                </div>
                <AnimatePresence mode='wait'>
                    <div className="main-stats">
                        <div className="main-stat">
                            <Heading headingLevel={"h3"} className="title">{t("profile.average")} {t("typing.wpm")}</Heading>
                            <div className="value">
                                {Number.isNaN(avgWpm)
                                    ? <Skeleton width={120} height={110}></Skeleton>
                                    : <AnimatedDiv>{avgWpm}</AnimatedDiv>}
                            </div>
                        </div>
                        <div className="main-stat">
                            <Heading headingLevel={"h3"} className="title">{t("typing.accuracy")}</Heading>
                            <div className="value">
                                {Number.isNaN(avgAccuracy)
                                    ? <Skeleton width={120} height={110}></Skeleton>
                                    : <AnimatedDiv>{avgAccuracy}%</AnimatedDiv>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="secondary-stats">
                        <div className="secondary-stat">
                            <div className="title">{t("profile.best_wpm")}</div>
                            <div className="value">
                                {bestWpm == 0
                                    ? <Skeleton height={20}></Skeleton>
                                    : <AnimatedDiv>{bestWpm}</AnimatedDiv>
                                }
                                {/* {bestWpm} */}
                            </div>
                        </div>
                        <div className="secondary-stat">
                            <div className="title">{t("profile.best_accuracy")}</div>
                            <div className="value">
                                {bestAccuracy == 0
                                    ? <Skeleton height={20}></Skeleton>
                                    : <AnimatedDiv>{bestAccuracy}%</AnimatedDiv>
                                }
                            </div>
                        </div>
                    </div>
                    <table className="tests-list">
                        {tableIsVisible && (
                            <motion.thead
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <tr>
                                    <td className='mode'>{t("profile.mode")}</td>
                                    <td className='wpm'>{t("typing.wpm")}</td>
                                    <td className='accuracy'>{t("typing.accuracy")}</td>
                                    <td className='date'>{t("profile.date")}</td>
                                </tr>
                            </motion.thead>)}
                        <tbody>
                            {tests.map(test => {
                                return (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <td>{test.mode}</td>
                                        <td>{test.wpm}</td>
                                        <td>{Math.round(test.accuracy * 100)}%</td>
                                        <td>{test.date}</td>
                                    </motion.tr>
                                )
                            })}
                        </tbody>
                    </table>
                </AnimatePresence>
            </div>
        </AnimatedContainer>
    )
}

export default Profile