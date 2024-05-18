import { styled } from 'styled-components';

import Icon from 'components/Icon';

export const ControlIcon = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

export const SettingsContainer = styled.div`
  position: absolute;
  bottom: 65px;
  right: 0;
  border-radius: 12px;
  background-color: rgba(80, 80, 80, 0.5);
  padding: 10px 0;
`;

export const SettingsItem = styled.div`
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

export const SettingsText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 300;
`;

export const SettingsItemValue = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
