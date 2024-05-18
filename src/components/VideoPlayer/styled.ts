import { styled } from 'styled-components';

import Icon from 'components/Icon';

export const PlayerContainer = styled.div`
  position: relative;
`;

export const ControlsContainer = styled.div<{ $isHidden?: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in-out;
  opacity: ${(props) => (props.$isHidden ? 0 : 1)};
`;

export const CenterControlsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
`;

export const ControlsBar = styled.div<{ $isFullscreen?: boolean }>`
  width: 95%;
  box-sizing: border-box;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: ${(props) => (props.$isFullscreen ? '150px' : '35px')};
  background-color: rgba(80, 80, 80, 0.5);
  position: absolute;
  bottom: 20px;
  padding: 15px 35px;
`;

export const ControlIcon = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

export const TimeBlock = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 300;
  width: 30px;
  text-align: center;
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

export const ProgressBar = styled.input<{ $progressWidth: number }>`
  margin: 0 5px;
  width: 100%;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  outline: none;

  &[type='range']:before {
    content: '';
    background-color: #fff;
    width: ${(props) => `${props.$progressWidth}px`};
    height: 6px;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
    display: block;
    position: absolute;
  }

  /***** Chrome, Safari, Opera, and Edge Chromium *****/

  &[type='range']::-webkit-slider-runnable-track {
    background: #969696;
    border-radius: 5px;
    height: 6px;
  }

  &[type='range']::-webkit-slider-thumb {
    appearance: none;
    background-color: #fff;
    border-radius: 99px;
    width: 16px;
    height: 16px;
    margin-top: -5px;
  }

  /******** Firefox ********/

  &[type='range']::-moz-range-track {
    background: #969696;
    border-radius: 5px;
    height: 6px;
  }

  &[type='range']::-moz-range-thumb {
    appearance: none;
    background-color: #fff;
    border-radius: 99px;
    width: 16px;
    height: 16px;
    margin-top: -5px;
  }
`;

export const RightControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;
`;

export const StyledVideo = styled.video`
  background-color: #000;
  transition: all 0.5s ease-in-out;

  @media (max-width: 900px) {
    width: 100vw;
    height: 100vh;
  }
`;
