import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { secToMin } from 'helpers/convertSecToMin';

import { initialTime } from './config';
import { PlayerControlsProps } from './types';

export default function usePlayerControls({
  videoRef,
  defaultWidth,
  defaultHeight,
  fullscreenWidth,
  fullscreenHeight,
  setControlsVisible,
}: PlayerControlsProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(initialTime);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying, videoRef]);

  const toggleVolume = useCallback(() => {
    if (isMuted && videoRef.current) {
      videoRef.current.muted = false;
    } else if (videoRef.current) {
      videoRef.current.muted = true;
    }
    setIsMuted(!isMuted);
  }, [isMuted, videoRef]);

  const toggleScreenSize = useCallback(() => {
    if (videoRef.current) {
      if (!isFullScreen) {
        videoRef.current.style.width = fullscreenWidth;
        videoRef.current.style.height = fullscreenHeight;
      } else {
        videoRef.current.style.width = defaultWidth;
        videoRef.current.style.height = defaultHeight;
      }
      setIsFullScreen(!isFullScreen);
    }
  }, [
    defaultHeight,
    defaultWidth,
    fullscreenHeight,
    fullscreenWidth,
    isFullScreen,
    videoRef,
  ]);

  const skipTime = useCallback(
    (time: number, isBackward?: boolean) => {
      if (videoRef.current) {
        if (!isBackward) {
          videoRef.current.currentTime += time;
        } else {
          videoRef.current.currentTime -= time;
        }
        setCurrentTime(secToMin(videoRef.current.currentTime));
      }
    },
    [videoRef]
  );

  const handleChangeSpeed = useCallback(
    (speed: number) => {
      if (videoRef.current) {
        videoRef.current.playbackRate = speed;
        setSpeed(speed);
      }
    },
    [videoRef]
  );

  const handleProgressBarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (videoRef.current) {
        videoRef.current.currentTime = +e.target.value;
        setCurrentTime(secToMin(videoRef.current.currentTime));
      }
    },
    [videoRef]
  );

  const handleKeyPressed = useCallback(
    (event: globalThis.KeyboardEvent) => {
      event.preventDefault();
      setControlsVisible();
      switch (event.code) {
        case 'Space':
          togglePlay();
          break;
        case 'KeyM':
          toggleVolume();
          break;
        case 'KeyF':
          toggleScreenSize();
          break;
        case 'ArrowLeft':
          skipTime(10, true);
          break;
        case 'ArrowRight':
          skipTime(10);
          break;
        case 'Comma':
          if (speed > 0.25) {
            handleChangeSpeed(speed - 0.25);
          }
          break;
        case 'Period':
          if (speed < 2) {
            handleChangeSpeed(speed + 0.25);
          }
          break;
        default:
          break;
      }
    },
    [
      handleChangeSpeed,
      setControlsVisible,
      skipTime,
      speed,
      togglePlay,
      toggleScreenSize,
      toggleVolume,
    ]
  );

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current) {
          setDuration(secToMin(videoRef.current.duration));
        }
      };
    }
  }, [videoRef]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (videoRef.current) {
          setCurrentTime(secToMin(videoRef.current.currentTime));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, videoRef]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPressed);

    return () => {
      document.removeEventListener('keydown', handleKeyPressed);
    };
  }, [handleKeyPressed]);

  return {
    isPlaying,
    isMuted,
    isFullScreen,
    speed,
    currentTime,
    duration,
    togglePlay,
    toggleVolume,
    toggleScreenSize,
    skipTime,
    handleChangeSpeed,
    handleProgressBarChange,
  };
}
