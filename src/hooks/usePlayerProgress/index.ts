import { RefObject } from 'react';
import { timeToSec } from 'helpers/convertTimeToSec';
import { Time } from 'types/time';

export default function usePlayerProgress(
  progressBarRef: RefObject<HTMLInputElement>,
  currentTime: Time,
  duration: Time,
  thumbWidth: number
) {
  const barWidth = progressBarRef.current?.offsetWidth ?? 0;

  return (
    (timeToSec(currentTime) / timeToSec(duration)) * (barWidth - thumbWidth) +
    thumbWidth / 2
  );
}
