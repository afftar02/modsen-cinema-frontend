import { RefObject } from 'react';

export type PlayerControlsProps = {
  videoRef: RefObject<HTMLVideoElement>;
  defaultWidth: string;
  defaultHeight: string;
  fullscreenWidth: string;
  fullscreenHeight: string;
  setControlsVisible: () => void;
};