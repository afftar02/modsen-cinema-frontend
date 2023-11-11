import { styled, useTheme } from 'styled-components';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type WrapperProps = {
  children?: ReactNode;
};

const Container = styled.div<{ $bgColor: string }>`
  background: ${(props) => props.$bgColor}
    radial-gradient(
      farthest-side,
      ${(props) => props.theme.bgColor} 50%,
      transparent 50%
    )
    no-repeat;
  background-size: 300% 300%;
`;

function Wrapper({ children }: WrapperProps) {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const [bgColor, setBgColor] = useState(theme.bgColor);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    wrapperRef.current?.animate(
      [{ backgroundPosition: 'bottom left' }, { backgroundPosition: 'center' }],
      {
        duration: 1000,
        iterations: 1,
        delay: 300,
      }
    );
    setTimeout(() => {
      setBgColor(theme.bgColor);
    }, 1200);
  }, [theme]);

  useEffect(() => {
    if (localStorage.getItem('language')) {
      i18n.changeLanguage(localStorage.getItem('language') as string);
    }
  }, [i18n]);

  return (
    <Container ref={wrapperRef} $bgColor={bgColor} data-cy={'theme-wrapper'}>
      {children}
    </Container>
  );
}

export default Wrapper;
