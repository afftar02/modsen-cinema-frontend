export const timeToSec = (time: { min: number; sec: number }) =>
  time.min * 60 + time.sec;
