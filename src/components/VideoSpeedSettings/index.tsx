import Icon from 'components/Icon';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';

type VideoSpeedSettingsProps = {
  speed: number;
  onChangeSpeed: (speed: number) => void;
  onReturn: () => void;
};

const SettingsContainer = styled.div`
  position: absolute;
  bottom: 65px;
  right: 0;
  border-radius: 12px;
  background-color: rgba(80, 80, 80, 0.5);
  padding: 10px 0;
`;

const SettingsText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 300;
`;

const ParamTitleBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px 5px 10px;
  height: 30px;
  border-bottom: 1px solid rgba(120, 120, 120, 0.5);
  cursor: pointer;
`;

const SettingsParamItem = styled.div`
  width: 150px;
  display: flex;
  align-items: center;
  height: 35px;
  padding: 0 30px;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  position: relative;

  &:hover {
    background-color: rgba(120, 120, 120, 0.5);
  }
`;

const TickIcon = styled(Icon)`
  position: absolute;
  left: 5px;
  top: 7px;
`;

const speedValues = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

function VideoSpeedSettings({
  speed,
  onChangeSpeed,
  onReturn,
}: VideoSpeedSettingsProps) {
  const { t } = useTranslation();

  return (
    <SettingsContainer>
      <ParamTitleBlock onClick={onReturn}>
        <Icon
          id={'left-arrow-nested'}
          height={20}
          width={20}
          viewBox="0 0 24 24"
        />
        <SettingsText>{t('video_settings_speed')}</SettingsText>
      </ParamTitleBlock>
      {speedValues.map((value, index) => (
        <SettingsParamItem onClick={() => onChangeSpeed(value)} key={index}>
          {speed === value && (
            <TickIcon id={'tick'} height={20} width={20} viewBox="0 0 24 24" />
          )}
          <SettingsText>
            {value === 1 ? t('video_normal_speed') : value}
          </SettingsText>
        </SettingsParamItem>
      ))}
    </SettingsContainer>
  );
}

export default VideoSpeedSettings;
