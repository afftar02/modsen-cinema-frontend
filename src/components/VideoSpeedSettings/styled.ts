import { styled } from 'styled-components';

import Icon from 'components/Icon';

export const SettingsContainer = styled.div`
  position: absolute;
  bottom: 65px;
  right: 0;
  border-radius: 12px;
  background-color: rgba(80, 80, 80, 0.5);
  padding: 10px 0;

  @media (max-width: 900px) {
    padding: 5px 0;
  }
`;

export const SettingsText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 300;
`;

export const ParamTitleBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 10px 5px 10px;
  height: 30px;
  border-bottom: 1px solid rgba(120, 120, 120, 0.5);
  cursor: pointer;
`;

export const SettingsParamItem = styled.div`
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

  @media (max-width: 900px) {
    height: 30px;
  }
`;

export const TickIcon = styled(Icon)`
  position: absolute;
  left: 5px;
  top: 7px;
`;
