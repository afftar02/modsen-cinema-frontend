import { styled } from 'styled-components';
import Icon from 'components/Icon';
import { useState } from 'react';
import VideoPlayer from 'components/VideoPlayer';
import ModalPortal from 'components/ModalPortal';

type VideoPreviewProps = {
  previewUrl: string;
  videoUrl: string;
  isHiding?: boolean;
};

const Preview = styled.div<{ $previewUrl: string; $isHiding?: boolean }>`
  background:
    url(${(props) => props.$previewUrl}),
    lightgray 50% / cover no-repeat;
  background-size: cover;
  box-shadow: ${(props) =>
    props.$isHiding
      ? '250px 10px 250px 0px #1e1f27 inset'
      : '15px 15px 50px 0px #000'};

  position: relative;
  ${(props) => props.$isHiding && 'left: -105px;'}
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

const CloseIcon = styled(Icon)`
  position: absolute;
  top: 40px;
  right: 50px;
  cursor: pointer;
  opacity: 1;
  z-index: 5;
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
        <ModalPortal isFixed>
          <CloseIcon
            id="close"
            width={50}
            height={50}
            viewBox="0 0 50 50"
            onClick={() => setPlayerOpened(false)}
          />
          <VideoPlayer src={videoUrl} />
        </ModalPortal>
      )}
      <Preview $previewUrl={previewUrl} $isHiding={isHiding} {...props}>
        <PlayIcon
          id={'play-preview'}
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
