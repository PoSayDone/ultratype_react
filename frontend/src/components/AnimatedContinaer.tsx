import { motion } from 'framer-motion'
import React from 'react'

type Props = {
    children: any
}

const AnimatedContinaer = (props: Props) => {
    return (
        <motion.div
            className="container"
            initial={{ opacity: 0 }}
            animate={{ opacity: "100%" }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.08
            }}
        >
            {props.children}
        </motion.div>
    )
}

export default AnimatedContinaer