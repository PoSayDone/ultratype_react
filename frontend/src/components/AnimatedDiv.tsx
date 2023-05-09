import { MotionProps, motion } from 'framer-motion'
import React, { HtmlHTMLAttributes } from 'react'

const AnimatedDiv = ({...rest }, key: any) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: "100%" }}
            exit={{ translateY: 0 }}
            transition={{
                duration: 0.6
            }}
            key={key}
            {...rest}
        >
        </motion.div>
    )
}

export default AnimatedDiv