import Icon from 'components/Icon';

import { speedValues } from './config';
import {
  ParamTitleBlock,
  SettingsContainer,
  SettingsParamItem,
  SettingsText,
  TickIcon,
} from './styled';
import { VideoSpeedSettingsProps } from './types';

function VideoSpeedSettings({
  speed,
  onChangeSpeed,
  onReturn,
}: VideoSpeedSettingsProps) {
  return (
    <SettingsContainer>
      <ParamTitleBlock onClick={onReturn}>
        <Icon
          id={'left-arrow-nested'}
          height={20}
          width={20}
          viewBox="0 0 24 24"
        />
        <SettingsText>Speed</SettingsText>
      </ParamTitleBlock>
      {speedValues.map((value, index) => (
        <SettingsParamItem onClick={() => onChangeSpeed(value)} key={index}>
          {speed === value && (
            <TickIcon id={'tick'} height={20} width={20} viewBox="0 0 24 24" />
          )}
          <SettingsText>{value === 1 ? 'Normal' : value}</SettingsText>
        </SettingsParamItem>
      ))}
    </SettingsContainer>
  );
}

export default VideoSpeedSettings;
