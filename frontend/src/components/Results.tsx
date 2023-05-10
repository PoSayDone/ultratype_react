import React from 'react'
import Heading from './Heading/Heading';
import { motion } from 'framer-motion';

type Props = {
    accuracyPercentage: number;
    wpm: number;
    time: number
}

const Results = (props: Props) => {
    const { accuracyPercentage, wpm, time } = props
    return (
        <motion.div
            initial={{ translateY: "100%" }}
            animate={{ translateY: 0 }}
            exit={{ translateY: "100%" }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 30
            }}
        >
            <div className="title__section">
                <Heading headingLevel={'h1'}>Результаты</Heading>
            </div>
            <div className="results">
                <div className='results__item'>
                    <Heading headingLevel={'h2'}>wpm</Heading>
                    <div className='results__item_title'>{Number.isNaN(wpm) ? '0' : wpm}</div>
                    <Heading headingLevel={"h2"}>+12% к ср.</Heading>
                </div>
                <div className='results__item'>
                    <Heading headingLevel={'h2'}>accuracy</Heading>
                    <div className='results__item_title'>{accuracyPercentage}%</div>
                    <Heading headingLevel={"h2"}>+12% к ср.</Heading>
                </div>
                <div className='results__item'>
                    <Heading headingLevel={'h2'}>time</Heading>
                    <div className='results__item_title'>{time}s</div>
                    <Heading headingLevel={"h2"}>+12% к ср.</Heading>
                </div>
            </div>
        </motion.div>
    )
}

export default Results