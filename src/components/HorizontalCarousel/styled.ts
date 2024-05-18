import { styled } from 'styled-components';

import Icon from 'components/Icon';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

export const Slider = styled.div`
  width: 764px;
  height: 130px;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  gap: 40px;
  scroll-behavior: smooth;
  position: relative;
  margin: 0 40px;
  padding-top: 25px;
  padding-bottom: 15px;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1000px) {
    width: 484px;
  }
  @media (max-width: 700px) {
    margin: 0;
    overflow: scroll;
    gap: 10px;
    width: 336px;
  }
`;

export const StyledIcon = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.5;
  }
`;

export const Slide = styled.div<{ $isActive: boolean; $isNearActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: 0.5s;
  cursor: pointer;
  width: 98px;
  height: 96px;
  background-color: #bdbdbd;
  border: 1px solid #000;
  border-radius: 10px;
  color: #000;
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 48px;
  font-weight: 300;

  &:hover {
    opacity: 0.7;
  }

  &:first-child {
    margin-left: 30px;
  }
  &:last-child {
    margin-right: 30px;
  }

  @media (max-width: 700px) {
    width: 78px;
    height: 76px;

    &:first-child {
      margin-left: 5px;
    }
    &:last-child {
      margin-right: 5px;
    }
  }

  ${(props) =>
    props.$isActive &&
    `
    height: 128px;
    width: 130px;
    background-color: #D98639;
    cursor: default;
    
    &:hover {
      opacity: 1;
    }
    
    @media(max-width: 700px){
      height: 108px;
      width: 110px;
    }
   `};
  ${(props) =>
    props.$isNearActive &&
    `
    width: 114px;
    height: 112px;
    
    @media(max-width: 700px){
      width: 94px;
      height: 92px;
    }
  `};
`;

export const Divider = styled.div`
  width: 764px;
  height: 2px;
  flex-shrink: 0;
  background-color: #fff;

  @media (max-width: 1000px) {
    width: 484px;
  }
  @media (max-width: 700px) {
    width: 336px;
  }
`;
