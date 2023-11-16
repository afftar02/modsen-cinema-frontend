import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { ModalWrapper } from './styled';
import { ModalPortalProps } from './types';

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
