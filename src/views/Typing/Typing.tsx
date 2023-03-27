import { FC } from 'react';
import './Typing.module.scss'
import Heading from '../../components/Heading/Heading';

interface TypingProps {
    title: string;
    subtitle: string;
}

const Typing:FC<TypingProps> = ({title, subtitle}) => {
    return (
        <>
        <div className="title__section">
            <Heading headingLevel="h1" className="title">
                {title}
            </Heading>
            <Heading headingLevel="h3" className="subtitle">
                {subtitle}
            </Heading>
        </div>
        </>
    )
}
export default Typing