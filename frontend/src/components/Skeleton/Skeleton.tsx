import { FC, Ref, forwardRef } from "react"
import "./Skeleton.scss"
import { motion } from "framer-motion";
import AnimatedDiv from "../AnimatedDiv";

interface SkeletonProps {
    width?: number;
    height?: number;
    count?: number;
    className?: string;
    style?: React.CSSProperties;
    inline?: boolean;
}

const Skeleton: FC<SkeletonProps> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
    const skeletonStyles = {
        width: props.width ? `${props.width}px` : '100%',
        height: props.height ? `${props.height}px` : '',
    }

    return (
        <>
            {Array(props.count ? props.count : 1).fill(0).map(item => {
                return (
                    <>
                        <AnimatedDiv
                            className={`skeleton ${props.className ? props.className : ''}`} style={{ ...skeletonStyles, ...props.style }}>
                            ‌
                        </AnimatedDiv>
                        {props.inline ? '' : <br />}
                    </>
                )
            })}
        </>
    )
});

export default Skeleton