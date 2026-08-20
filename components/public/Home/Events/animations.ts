import { Variants } from "framer-motion";

export const easing = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export const fadeUpReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const stagger: Variants = {
  hidden: {},
  show: { 
    transition: { staggerChildren: 0.12 } 
  },
};