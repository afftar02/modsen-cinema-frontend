import { styled } from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

type SectionTitleProps = {
  children: ReactNode;
};

const StyledSpan = styled(motion.span)`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 48px;
  font-weight: 300;
  text-transform: uppercase;
  display: inline-block;
`;

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <StyledSpan
      initial={{ opacity: 0, translateY: '50%' }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.5,
      }}
      viewport={{ once: true }}
    >
      {children}
    </StyledSpan>
  );
}

export default SectionTitle;
