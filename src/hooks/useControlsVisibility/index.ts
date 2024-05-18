import { useCallback, useRef, useState } from 'react';

export default function useControlsVisibility() {
  const [isControlsHidden, setIsControlsHidden] = useState(false);
  const cursorMoveTimeoutIdRef = useRef(0);

  const setControlsVisible = useCallback(() => {
    clearTimeout(cursorMoveTimeoutIdRef.current);
    setIsControlsHidden(false);

    cursorMoveTimeoutIdRef.current = Number(
      setTimeout(() => setIsControlsHidden(true), 1500)
    );
  }, []);

  return {
    isControlsHidden,
    setControlsVisible,
  };
}