import { memo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'styled-components';

import CloseIcon from 'components/CloseIcon';
import ModalPortal from 'components/ModalPortal';
import VideoPlayer from 'components/VideoPlayer';

import { PlayIcon, Preview } from './styled';
import { VideoPreviewProps } from './types';

function VideoPreview({
  previewUrl,
  videoUrl,
  isHiding = false,
  ...props
}: VideoPreviewProps) {
  const [playerOpened, setPlayerOpened] = useState(false);

  const theme = useTheme();

  return (
    <>
      <AnimatePresence>
        {playerOpened && (
          <ModalPortal isFixed>
            <CloseIcon
              onClick={() => setPlayerOpened(false)}
              lineColor={theme.closeIconVideoModalColor}
              bgColor={theme.closeIconVideoModalBgColor}
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

export default memo(VideoPreview);
