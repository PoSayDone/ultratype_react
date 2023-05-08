import { FC, Ref, forwardRef } from "react"
import "./Skeleton.scss"
import { motion } from "framer-motion";

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
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: "100%" }}
                            exit={{ translateY: 0 }}
                            transition={{
                                duration: 0.6
                            }}
                            ref={ref} className={`skeleton ${props.className ? props.className : ''}`} style={{ ...skeletonStyles, ...props.style }}>
                            ‌
                        </motion.div>
                        {props.inline ? '' : <br />}
                    </>
                )
            })}
        </>
    )
});

export default Skeleton