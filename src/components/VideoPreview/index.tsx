import { styled } from 'styled-components';
import { useState } from 'react';
import ModalPortal from 'components/ModalPortal';
import CloseIcon from 'components/CloseIcon';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon, VideoPlayer } from 'modsen-library';

type VideoPreviewProps = {
  previewUrl: string;
  videoUrl: string;
  isHiding?: boolean;
};

const Preview = styled(motion.div)<{
  $previewUrl: string;
  $isHiding?: boolean;
}>`
  background:
    url(${(props) => props.$previewUrl}),
    lightgray 50% / cover no-repeat;
  background-size: cover;
  box-shadow: ${(props) =>
    props.$isHiding
      ? `250px 10px 250px 0px ${props.theme.shadowColor} inset`
      : '15px 15px 50px 0px #000'};

  position: relative;
  ${(props) => props.$isHiding && 'left: -105px;'}
  width: 850px;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 1.3s ease-in-out;
`;

const PlayIcon = styled(Icon)`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.15);
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
      <AnimatePresence>
        {playerOpened && (
          <ModalPortal isFixed>
            <CloseIcon
              onClick={() => setPlayerOpened(false)}
              lineColor={'#DBDBDB'}
              bgColor={'#D9D9D9'}
            />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{
                duration: 0.3,
              }}
            >
              <VideoPlayer src={videoUrl} />
            </motion.div>
          </ModalPortal>
        )}
      </AnimatePresence>
      <Preview
        $previewUrl={previewUrl}
        $isHiding={isHiding}
        {...props}
        initial={{ opacity: 0, translateY: '100px' }}
        whileInView={{ opacity: 1, translateY: 0 }}
        transition={{
          duration: 0.5,
        }}
        viewport={{ once: true }}
      >
        <PlayIcon
          id={'play-preview'}
          data-cy={'play-preview'}
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
