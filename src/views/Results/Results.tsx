import React from 'react'
import Heading from '../../components/Heading/Heading';

type Props = {
    errors: number;
    accuracyPercentage: number;
    wpm: number;
    total: number;
}

const Results = (props: Props) => {
  return (
    <>
    <div className="title__section">
        <Heading headingLevel={'h1'}>Результаты</Heading>
    </div>
    <ul>
        <li>Accuracy: {props.accuracyPercentage}</li>
        <li>Wpm: {props.wpm}</li>
        <li>Errors: {props.errors}</li>
        <li>Typed: {props.total}</li>
    </ul>
    </>
  )
}

export default Results