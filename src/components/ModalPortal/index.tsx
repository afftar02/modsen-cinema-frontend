import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { styled } from 'styled-components';

import { ModalPortalProps } from './types';

const ModalWrapper = styled.div<{ $isFixed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: ${(props) => (props.$isFixed ? 'fixed' : 'absolute')};
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(30, 31, 39, 0.7);
  z-index: 30;
`;

function ModalPortal({ children, isFixed = false }: ModalPortalProps) {
  useEffect(() => {
    if (isFixed) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isFixed]);

  return createPortal(
    <ModalWrapper $isFixed={isFixed}>{children}</ModalWrapper>,
    document.body
  );
}

export default ModalPortal;
