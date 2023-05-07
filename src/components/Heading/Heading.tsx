import { FC } from "react";
import "./Heading.module.scss";

type HeadingProps = {
    className?: string;
    children?: React.ReactNode;
    headingLevel?: any;
}

const Heading: React.FC<HeadingProps> = ({
    headingLevel,
    children,
    className,
}) => {
    const Heading = headingLevel;
    return <Heading className={className}>{children}</Heading>
}

export default Heading