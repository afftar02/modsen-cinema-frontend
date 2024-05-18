import { useCallback, useState } from 'react';

import Icon from 'components/Icon';
import VideoSpeedSettings from 'components/VideoSpeedSettings';

import {
  ControlIcon,
  SettingsContainer,
  SettingsItem,
  SettingsItemValue,
  SettingsText,
} from './styled';
import { VideoSettingsProps } from './types';

function VideoSettings({ speed, onChangeSpeed }: VideoSettingsProps) {
  const [isSettingsOpened, setSettingsOpened] = useState(false);
  const [openedSettingsParam, setOpenedSettingsParam] = useState('');

  const handleSettingsClick = useCallback(() => {
    setSettingsOpened((prev) => !prev);
    setOpenedSettingsParam('');
  }, []);

  const handleSpeedChange = useCallback(
    (speed: number) => {
      onChangeSpeed(speed);
      setSettingsOpened(false);
      setOpenedSettingsParam('');
    },
    [onChangeSpeed]
  );

  return (
    <>
      <ControlIcon
        id={'settings'}
        height={20}
        width={20}
        viewBox="0 0 48 48"
        onClick={handleSettingsClick}
        fill={'#fff'}
      />
      {isSettingsOpened && openedSettingsParam === '' && (
        <SettingsContainer>
          <SettingsItem onClick={() => setOpenedSettingsParam('speed')}>
            <SettingsText>Speed</SettingsText>
            <SettingsItemValue>
              <SettingsText>{speed === 1 ? 'Normal' : speed}</SettingsText>
              <Icon
                id={'right-arrow-nested'}
                height={20}
                width={20}
                viewBox="0 0 24 24"
              />
            </SettingsItemValue>
          </SettingsItem>
        </SettingsContainer>
      )}
      {openedSettingsParam === 'speed' && (
        <VideoSpeedSettings
          onChangeSpeed={handleSpeedChange}
          onReturn={() => setOpenedSettingsParam('')}
          speed={speed}
        />
      )}
    </>
  );
}

export default VideoSettings;
