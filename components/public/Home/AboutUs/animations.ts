import { Variants } from "framer-motion";

export const easing = [0.16, 1, 0.3, 1] as const;

export const upVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export const rightVariant: Variants = {
  hidden: { opacity: 0, x: 60, scale: 0.96 },
  show: { opacity: 1, x: 0, scale: 1 },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};