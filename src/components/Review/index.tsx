import Icon from 'components/Icon';
import { styled } from 'styled-components';
import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type ReviewProps = {
  author: string;
  text: string;
  bgColor: string;
};

const ReviewContainer = styled(motion.div)<{ $bgColor: string }>`
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

const ReviewTitle = styled.span`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 32px;
  font-weight: 400;
  text-transform: uppercase;
`;

const AuthorDescription = styled.span`
  color: #fff;
  text-align: center;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 300;
  text-transform: capitalize;
`;

const ReviewTextContainer = styled.div<{ $isOpened: boolean }>`
  width: 326px;
  height: 217px;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.$isOpened ? 'unset' : 9)};
  -webkit-box-orient: vertical;
`;

const ReviewText = styled.p`
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

const ShowMoreContainer = styled.div`
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

const ShowMoreText = styled.span`
  color: #d98639;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-weight: 300;
  text-transform: uppercase;
`;

const DEFAULT_HEIGHT = 217;
const TEXT_OVERFLOW_COEFFICIENT = 1.8;
const TEXT_COEFFICIENT = 1.6;

function Review({ author, text, bgColor }: ReviewProps) {
  const [opened, setOpened] = useState(false);
  const reviewRef = useRef<HTMLDivElement>(null);

  const isOverflowed = useMemo(
    () => text.length / TEXT_OVERFLOW_COEFFICIENT > DEFAULT_HEIGHT,
    [text]
  );

  const handleShowClick = () => {
    if (reviewRef.current && isOverflowed) {
      reviewRef.current.style.height = opened
        ? `${DEFAULT_HEIGHT}px`
        : `${text.length / TEXT_COEFFICIENT}px`;
      setOpened(!opened);
    }
  };

  return (
    <ReviewContainer
      $bgColor={bgColor}
      onClick={handleShowClick}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
      }}
      viewport={{ once: true }}
    >
      <ReviewTitle>Review</ReviewTitle>
      <AuthorDescription>from {author}</AuthorDescription>
      <ReviewTextContainer ref={reviewRef} $isOpened={opened}>
        <ReviewText>{text}</ReviewText>
      </ReviewTextContainer>
      {isOverflowed && (
        <ShowMoreContainer onClick={handleShowClick}>
          <ShowMoreText>read more</ShowMoreText>
          <Icon id={'show'} width={40} height={40} viewBox="0 0 40 40" />
        </ShowMoreContainer>
      )}
    </ReviewContainer>
  );
}

export default Review;
