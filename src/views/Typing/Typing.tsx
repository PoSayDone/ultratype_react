import { FC } from 'react';
import './Typing.scss'

interface TypingProps {
    title: string;
    subtitle: string;
}

const Typing:FC<TypingProps> = ({title, subtitle}) => {
    return (
        <>
        <div className="title__section">
            <h1 className="title">
                {title}
            </h1>
            <h3 className="subtitle">
                {subtitle}
            </h3>
        </div>
        </>
    )
}
export default Typing