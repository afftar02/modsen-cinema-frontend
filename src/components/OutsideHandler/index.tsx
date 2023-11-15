import { ReactNode, useRef } from 'react';
import { useClickOutside } from 'hooks/useClickOutside';

type OutsideHandlerProps = {
  children: ReactNode;
  onClick: () => void;
};

export default function OutsideHandler({
  children,
  onClick,
}: OutsideHandlerProps) {
  const wrapperRef = useRef(null);

  useClickOutside(wrapperRef, onClick);

  return <div ref={wrapperRef}>{children}</div>;
}
