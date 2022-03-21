import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type InputErrorProps = {
  children: ReactNode;
  hasErrors: boolean;
};

const InputError = ({ children, hasErrors }: InputErrorProps) => (
  <motion.div
    animate={hasErrors ? 'hasErrors' : 'noErrors'}
    transition={{ duration: 0.25 }}
    initial='noErrors'
    variants={{
      noErrors: { x: 0 },
      hasErrors: { x: [-5, 5, -5, 0] },
    }}
  >
    {children}
  </motion.div>
);

export default InputError;
