import { StyledSpan } from './styled';
import { SectionTitleProps } from './types';

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
