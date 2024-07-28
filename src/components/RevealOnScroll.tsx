import {motion, useAnimation} from "framer-motion";
import React, {useEffect} from "react";
import {useInView} from "react-intersection-observer";

const RevealOnScroll = ({children}: { children: React.ReactNode }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({threshold: 0.1});

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);

    const variants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.5, ease: "easeOut"}
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};

export default RevealOnScroll;
