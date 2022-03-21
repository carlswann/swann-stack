import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type ButtonAnimationProps = {
  children: ReactNode;
};

const ButtonAnimation = ({ children }: ButtonAnimationProps) => (
  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
    {children}
  </motion.div>
);

export default ButtonAnimation;
