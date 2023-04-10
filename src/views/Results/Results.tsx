import React from 'react'
import Heading from '../../components/Heading/Heading';
import {useTypedSelector} from "../../hooks/useTypedSelector";

type Props = {
    accuracyPercentage: number;
    wpm: number;
    time: number
}

const Results = (props: Props) => {
    const{accuracyPercentage, wpm , time} = props
  return (
    <>
    <div className="title__section">
        <Heading headingLevel={'h1'}>Результаты</Heading>
    </div>
    <ul>
        <li>Accuracy: {accuracyPercentage}</li>
        <li>Wpm: {wpm}</li>
        <li>Time: {time}</li>
    </ul>
    </>
  )
}

export default Results