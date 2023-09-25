import { styled } from 'styled-components';
import Icon from 'components/Icon';
import { useState } from 'react';
import VideoPlayer from '../VideoPlayer';

type VideoPreviewProps = {
  previewUrl: string;
  videoUrl: string;
  isHiding?: boolean;
};

const Preview = styled.div<{ previewUrl: string; isHiding?: boolean }>`
  background:
    url(${(props) => props.previewUrl}),
    lightgray 50% / cover no-repeat;
  background-size: cover;
  box-shadow: ${(props) =>
    props.isHiding
      ? '250px 10px 250px 0px #1e1f27 inset'
      : '15px 15px 50px 0px #000'};

  position: relative;
  ${(props) => props.isHiding && 'left: -105px;'}
  width: 850px;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlayIcon = styled(Icon)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.15);
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
  width: 100vw;
  height: 100vh;
  background-color: rgba(30, 31, 39, 0.7);
`;

const CloseIcon = styled(Icon)`
  position: absolute;
  top: 40px;
  right: 50px;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

function VideoPreview({
  previewUrl,
  videoUrl,
  isHiding = false,
  ...props
}: VideoPreviewProps) {
  const [playerOpened, setPlayerOpened] = useState(false);

  return (
    <>
      {playerOpened && (
        <ModalWrapper>
          <CloseIcon
            id="close"
            width={50}
            height={50}
            viewBox="0 0 50 50"
            onClick={() => setPlayerOpened(false)}
          />
          <VideoPlayer src={videoUrl} />
        </ModalWrapper>
      )}
      <Preview previewUrl={previewUrl} isHiding={isHiding} {...props}>
        <PlayIcon
          id={'play'}
          width={70}
          height={70}
          viewBox="0 0 70 70"
          onClick={() => setPlayerOpened(true)}
        />
      </Preview>
    </>
  );
}

export default VideoPreview;
