import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import Icon from 'components/Icon';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 497px;
`;

export const CurrentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  max-width: 262px;
  align-items: center;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 700px) {
    max-width: 160px;
  }
`;

export const CurrentImage = styled.img`
  border-radius: 10px;
`;

export const InfoContainer = styled.div`
  text-align: center;

  margin-top: 23px;
`;

export const Title = styled.span<{ $color: string }>`
  color: ${(props) => props.$color};
  font-family: 'Poppins', sans-serif;
  font-size: 32px;
  font-weight: 500;
`;

export const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 10px;
  max-width: 260px;
  overflow: scroll;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  border-radius: 10px;
  background: #484747;

  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 500;

  padding: 0 18px;
`;

export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;

  margin-left: 96px;

  @media (max-width: 700px) {
    margin-left: 25px;
  }
`;

export const ImageSlider = styled.div`
  height: 100%;
  width: 137px;
  overflow: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 34px;
  scroll-behavior: smooth;
  position: relative;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ArrowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 86px;

  margin-left: 37px;

  @media (max-width: 700px) {
    margin-left: 20px;
  }
`;

export const StyledIcon = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.5;
  }
`;

export const Slide = styled.div<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: 0.5s;
  cursor: pointer;

  ${(props) =>
    props.$isActive
      ? `
      height: 182px;
      width: 137px;
      `
      : `
      height: 124px;
      width: 84px;

      &:hover {
        opacity: 0.5;
      }
    `}
`;

export const Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transition: 0.5s;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  height: fit-content;
`;

export const QualityText = styled.span`
  white-space: nowrap;
`;

export const GenreText = styled.span`
  text-transform: capitalize;
`;
