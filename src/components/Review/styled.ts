import { styled } from 'styled-components';

import Icon from 'components/Icon';

export const ReviewContainer = styled.div<{ $bgColor: string }>`
  border-radius: 20px;
  background: ${(props) => props.$bgColor};
  min-height: 375px;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  box-shadow: 15px 15px 25px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 33px 22px 22px;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ReviewTitle = styled.span`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 32px;
  font-weight: 400;
  text-transform: uppercase;
`;

export const AuthorDescription = styled.span`
  color: #fff;
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 300;
  text-transform: capitalize;
`;

export const ReviewTextContainer = styled.div<{ $isOpened: boolean }>`
  width: 326px;
  height: ${(props) => (props.$isOpened ? 'auto' : '217px')};
  overflow: hidden;
  max-height: ${(props) => (props.$isOpened ? '3000px' : '217px')};
  transition: max-height 0.5s ease-in-out;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.$isOpened ? 'unset' : 9)};
  -webkit-box-orient: vertical;
`;

export const ReviewText = styled.p`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-style: italic;
  font-weight: 300;

  &:before {
    content: '"';
  }
  &:after {
    content: '"';
  }
`;

export const ShowMoreContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
  transition: all 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`;

export const ShowMoreText = styled.span`
  color: #d98639;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 300;
  text-transform: uppercase;
`;

export const ShowIcon = styled(Icon)<{ $isOpened: boolean }>`
  ${(props) => props.$isOpened && 'transform: rotate(180deg)'};
`;
