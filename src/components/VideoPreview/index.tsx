import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { VideoPlayer } from 'modsen-library';

import CloseIcon from 'components/CloseIcon';
import ModalPortal from 'components/ModalPortal';

import { PlayIcon, Preview } from './styled';
import { VideoPreviewProps } from './types';

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
