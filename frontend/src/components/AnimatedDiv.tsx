import { motion } from 'framer-motion'
import React from 'react'

const AnimatedDiv = ({...rest}) => {
    return (
        <motion.div
            {...rest}
            initial={{ opacity: 0 }}
            animate={{ opacity: "100%" }}
            exit={{ translateY: 0 }}
            transition={{
                duration: 0.6
            }}
        >
        </motion.div>
    )
}

export default AnimatedDiv