import { useRef } from 'react';
import { timeToSec } from 'helpers/convertTimeToSec';
import useControlsVisibility from 'hooks/useControlsVisibility';
import usePlayerControls from 'hooks/usePlayerControls';
import usePlayerProgress from 'hooks/usePlayerProgress';
import useWindowDimensions from 'hooks/useWindowDimensions';

import VideoSettings from 'components/VideoSettings';

import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  FULLSCREEN_HEIGHT,
  FULLSCREEN_WIDTH,
  THUMB_WIDTH,
} from './config';
import {
  CenterControlsContainer,
  ControlIcon,
  ControlsBar,
  ControlsContainer,
  PlayerContainer,
  ProgressBar,
  ProgressBarContainer,
  RightControlsContainer,
  StyledVideo,
  TimeBlock,
} from './styled';
import { VideoPlayerProps } from './types';

function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const { width } = useWindowDimensions();

  const { isControlsHidden, setControlsVisible } = useControlsVisibility();

  const {
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
  } = usePlayerControls({
    videoRef,
    defaultWidth: DEFAULT_WIDTH,
    defaultHeight: DEFAULT_HEIGHT,
    fullscreenWidth: FULLSCREEN_WIDTH,
    fullscreenHeight: FULLSCREEN_HEIGHT,
    setControlsVisible,
  });

  const progress = usePlayerProgress(
    progressBarRef,
    currentTime,
    duration,
    THUMB_WIDTH
  );

  return (
    <PlayerContainer
      onMouseMove={setControlsVisible}
      onDoubleClick={togglePlay}
    >
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
              ref={progressBarRef}
              $progressWidth={progress}
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
            {width > 900 && (
              <ControlIcon
                id={'screen-control'}
                height={20}
                width={20}
                viewBox="0 0 24 24"
                onClick={toggleScreenSize}
              />
            )}
          </RightControlsContainer>
        </ControlsBar>
      </ControlsContainer>
    </PlayerContainer>
  );
}

export default VideoPlayer;
