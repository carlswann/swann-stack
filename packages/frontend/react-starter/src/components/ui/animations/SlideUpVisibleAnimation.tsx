import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type SlideUpVisibleAnimationProps = {
  children: ReactNode;
  distance?: number;
};

const SlideUpVisibleAnimation = ({ children, distance }: SlideUpVisibleAnimationProps) => (
  <motion.div
    initial='hidden'
    animate='visible'
    variants={{
      visible: { y: 0, opacity: 1 },
      hidden: { y: distance || 30, opacity: 0 },
      exit: { y: distance || 30, opacity: 0 },
    }}
  >
    {children}
  </motion.div>
);

export default SlideUpVisibleAnimation;
