import Icon from 'components/Icon';
import { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import VideoSpeedSettings from 'components/VideoSpeedSettings';
import { useTranslation } from 'react-i18next';

type VideoSettingsProps = {
  speed: number;
  onChangeSpeed: (speed: number) => void;
};

const ControlIcon = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

const SettingsContainer = styled.div`
  position: absolute;
  bottom: 65px;
  right: 0;
  border-radius: 12px;
  background-color: rgba(80, 80, 80, 0.5);
  padding: 10px 0;
`;

const SettingsItem = styled.div`
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  padding: 0 10px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(120, 120, 120, 0.5);
  }
`;

const SettingsText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 300;
`;

const SettingsItemValue = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

function VideoSettings({ speed, onChangeSpeed }: VideoSettingsProps) {
  const { t } = useTranslation();
  const [isSettingsOpened, setSettingsOpened] = useState(false);
  const [openedSettingsParam, setOpenedSettingsParam] = useState('');

  const handleSettingsClick = useCallback(() => {
    setSettingsOpened(!isSettingsOpened);
    setOpenedSettingsParam('');
  }, [isSettingsOpened]);

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
            <SettingsText>{t('video_settings_speed')}</SettingsText>
            <SettingsItemValue>
              <SettingsText>
                {speed === 1 ? t('video_normal_speed') : speed}
              </SettingsText>
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
