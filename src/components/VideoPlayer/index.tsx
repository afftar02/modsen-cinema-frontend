import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import Icon from 'components/Icon';
import VideoSettings from 'components/VideoSettings';
import { secToMin } from 'helpers/ConvertSecToMin';
import { timeToSec } from 'helpers/ConvertTimeToSec';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import { motion } from 'framer-motion';

type VideoPlayerProps = {
  src: string;
};

const PlayerContainer = styled(motion.div)`
  position: relative;
`;

const ControlsContainer = styled.div<{ $isHidden?: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in-out;
  opacity: ${(props) => (props.$isHidden ? 0 : 1)};
`;

const CenterControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
`;

const ControlsBar = styled.div<{ $isFullscreen?: boolean }>`
  width: 95%;
  box-sizing: border-box;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: ${(props) => (props.$isFullscreen ? '150px' : '35px')};
  background-color: rgba(80, 80, 80, 0.5);
  position: absolute;
  bottom: 20px;
  padding: 15px 35px;
`;

const ControlIcon = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

const TimeBlock = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 300;
  width: 30px;
  text-align: center;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const ProgressBar = styled.input<{ $progressWidth: number }>`
  margin: 0 5px;
  width: 100%;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  outline: none;

  &[type='range']:before {
    content: '';
    background-color: #fff;
    width: ${(props) => `${props.$progressWidth}px`};
    height: 6px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    display: block;
    position: absolute;
  }

  /***** Chrome, Safari, Opera, and Edge Chromium *****/

  &[type='range']::-webkit-slider-runnable-track {
    background: #969696;
    border-radius: 5px;
    height: 6px;
  }

  &[type='range']::-webkit-slider-thumb {
    appearance: none;
    background-color: #fff;
    border-radius: 99px;
    width: 16px;
    height: 16px;
    margin-top: -5px;
  }

  /******** Firefox ********/

  &[type='range']::-moz-range-track {
    background: #969696;
    border-radius: 5px;
    height: 6px;
  }

  &[type='range']::-moz-range-thumb {
    appearance: none;
    background-color: #fff;
    border-radius: 99px;
    width: 16px;
    height: 16px;
    margin-top: -5px;
  }
`;

const RightControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;
`;

const StyledVideo = styled.video`
  background-color: #000;
  transition: all 0.5s ease-in-out;
`;

const initialTime = {
  min: 0,
  sec: 0,
};

function VideoPlayer({ src }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isControlsHidden, setIsControlsHidden] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(initialTime);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorMoveTimeoutIdRef = useRef(0);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const toggleVolume = useCallback(() => {
    if (isMuted && videoRef.current) {
      videoRef.current.muted = false;
    } else if (videoRef.current) {
      videoRef.current.muted = true;
    }
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleScreenSize = useCallback(() => {
    if (videoRef.current) {
      if (!isFullScreen) {
        videoRef.current.style.width = '100vw';
        videoRef.current.style.height = '100vh';
      } else {
        videoRef.current.style.width = '850px';
        videoRef.current.style.height = '480px';
      }
      setIsFullScreen(!isFullScreen);
    }
  }, [isFullScreen]);

  const handleProgressBarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (videoRef.current) {
        videoRef.current.currentTime = +e.target.value;
        setCurrentTime(secToMin(videoRef.current.currentTime));
      }
    },
    []
  );

  const skipTime = useCallback((time: number, isBackward?: boolean) => {
    if (videoRef.current) {
      if (!isBackward) {
        videoRef.current.currentTime += time;
      } else {
        videoRef.current.currentTime -= time;
      }
      setCurrentTime(secToMin(videoRef.current.currentTime));
    }
  }, []);

  const handleChangeSpeed = useCallback((speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
      setSpeed(speed);
    }
  }, []);

  const handleMouseMove = useCallback(() => {
    clearTimeout(cursorMoveTimeoutIdRef.current);
    setIsControlsHidden(false);

    cursorMoveTimeoutIdRef.current = Number(
      setTimeout(() => setIsControlsHidden(true), 1500)
    );
  }, []);

  const handleKeyPressed = useCallback(
    (event: globalThis.KeyboardEvent) => {
      event.preventDefault();
      handleMouseMove();
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
      handleMouseMove,
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
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        if (videoRef.current) {
          setCurrentTime(secToMin(videoRef.current.currentTime));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPressed);

    return () => {
      document.removeEventListener('keydown', handleKeyPressed);
    };
  }, [handleKeyPressed]);

  return (
    <PlayerContainer
      onMouseMove={handleMouseMove}
      onDoubleClick={togglePlay}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{
        duration: 0.3,
      }}
    >
      <ErrorBoundary fallback={<ErrorFallback />}>
        <StyledVideo
          ref={videoRef}
          width={850}
          height={480}
          autoPlay
          muted={isMuted}
        >
          <source src={src} type="video/mp4" />
          <track kind="captions" srcLang="en" />
        </StyledVideo>
        <ControlsContainer $isHidden={isControlsHidden}>
          <CenterControlsContainer>
            <ControlIcon
              id={'skip-backward-10'}
              height={40}
              width={40}
              viewBox="0 0 64 64"
              onClick={() => skipTime(10, true)}
            />
            {isPlaying ? (
              <ControlIcon
                id={'pause'}
                height={40}
                width={40}
                viewBox="-1 0 8 8"
                onClick={togglePlay}
              />
            ) : (
              <ControlIcon
                id={'play'}
                height={40}
                width={40}
                viewBox="-3 0 28 28"
                onClick={togglePlay}
              />
            )}
            <ControlIcon
              id={'skip-forward-10'}
              height={40}
              width={40}
              viewBox="0 0 64 64"
              onClick={() => skipTime(10)}
            />
          </CenterControlsContainer>
          <ControlsBar $isFullscreen={isFullScreen}>
            {isPlaying ? (
              <ControlIcon
                id={'pause-control'}
                height={30}
                width={30}
                viewBox="0 0 512 512"
                onClick={togglePlay}
              />
            ) : (
              <ControlIcon
                id={'play-control'}
                height={30}
                width={30}
                viewBox="0 0 60 60"
                onClick={togglePlay}
              />
            )}
            <ProgressBarContainer>
              <TimeBlock>
                {currentTime.min}:
                {currentTime.sec > 9 ? currentTime.sec : `0${currentTime.sec}`}
              </TimeBlock>
              <ProgressBar
                type="range"
                min={0}
                max={timeToSec(duration)}
                value={timeToSec(currentTime)}
                $progressWidth={
                  isFullScreen
                    ? timeToSec(currentTime) * 6.6
                    : timeToSec(currentTime) * 2.7
                }
                onChange={handleProgressBarChange}
              />
              <TimeBlock>
                {duration.min}:
                {duration.sec > 9 ? duration.sec : `0${duration.sec}`}
              </TimeBlock>
            </ProgressBarContainer>
            <RightControlsContainer>
              {isMuted ? (
                <ControlIcon
                  id={'muted-control'}
                  height={20}
                  width={20}
                  viewBox="0 0 512 512"
                  onClick={toggleVolume}
                />
              ) : (
                <ControlIcon
                  id={'volume-control'}
                  height={20}
                  width={20}
                  viewBox="0 0 24 24"
                  onClick={toggleVolume}
                />
              )}
              <VideoSettings speed={speed} onChangeSpeed={handleChangeSpeed} />
              <ControlIcon
                id={'screen-control'}
                height={20}
                width={20}
                viewBox="0 0 24 24"
                onClick={toggleScreenSize}
              />
            </RightControlsContainer>
          </ControlsBar>
        </ControlsContainer>
      </ErrorBoundary>
    </PlayerContainer>
  );
}

export default VideoPlayer;
