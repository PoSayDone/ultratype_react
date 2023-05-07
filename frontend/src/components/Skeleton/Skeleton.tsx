import { FC } from "react"
import "./Skeleton.scss"

interface SkeletonProps {
    width?: number;
    height?: number;
    count?: number;
    className?: string;
    style?: React.CSSProperties;
    inline?: boolean;
}

const Skeleton: FC<SkeletonProps> = ({ className, width, height, count, style, inline }) => {
    const skeletonStyles = {
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '',
    }

    return (
        <>

            {Array(count ? count : 1).fill(0).map(item => {
                return (
                    <>
                        <div className={`skeleton ${className ? className : ''}`} style={{ ...skeletonStyles, ...style }}>
                            ‌
                        </div>
                        {inline ? '' : <br />}
                    </>
                )
            })}
        </>
    )

}

export default Skeleton