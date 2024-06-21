import { motion, Variants } from "framer-motion";

import { cn } from "@/lib/utils";

const AnimatedHeader = () => {
    const text = "Grow Trust & Credibility with Authentic Testimonials";
    const words = text.split(" ");

    const container: Variants = {
        hidden: {
            opacity: 0,
        },
        visible: (i = 1) => ({
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2 * i,
            }
        })
    };

    const child: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            }
        }
    };

    return (
        <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="font-black text-zinc-800 text-4xl lg:text-6xl tracking-tight"
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className={cn(
                        "inline-block",
                        index > 0 && index < 4 && "text-primary"
                    )}
                >
                    {word}{index !== words.length - 1 && "\u00A0"}
                </motion.span>
            ))}
        </motion.h1>
    )
};

export default AnimatedHeader;