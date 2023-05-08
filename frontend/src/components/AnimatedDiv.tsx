import { motion } from 'framer-motion'
import React from 'react'

type Props = {
    children: any
}

const AnimatedDiv = (props: Props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: "100%" }}
            exit={{ translateY: 0 }}
            transition={{
                duration: 0.6
            }}
        >
            {props.children}
        </motion.div>
    )
}

export default AnimatedDiv