import Icon from 'components/Icon';
import { styled } from 'styled-components';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

type ReviewProps = {
  bgColor: string;
};

const ReviewContainer = styled(motion.div)<{ $bgColor: string }>`
  border-radius: 20px;
  background: ${(props) => props.$bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
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

function Review({ bgColor }: ReviewProps) {
  const [opened, setOpened] = useState(false);

  const reviewRef = useRef<HTMLDivElement>(null);

  const handleShowClick = () => {
    if (reviewRef.current) {
      reviewRef.current.style.height = opened ? '217px' : '450px';
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
      <AuthorDescription>from Stanislav Lebedyantsev</AuthorDescription>
      <ReviewTextContainer ref={reviewRef} $isOpened={opened}>
        <ReviewText>
          I was a person that saw all the hype and claims of masterpiece as
          overreacting and overblown excitement for another Joker based film. I
          thought this looked solid at best and even a bit too pretentious in
          the trailer, but in here to say I was incredibly wrong. This is a
          massive achievement of cinema thats extremely rare in a day and age of
          cgi nonsense and reboots. While this Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Corporis dignissimos esse, ex nostrum
          praesentium quaerat. Consectetur consequatur culpa distinctio
          doloribus earum eum, maiores nisi numquam, quidem suscipit veritatis,
          voluptas voluptatem. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Animi enim eveniet, ipsa nisi non totam?
        </ReviewText>
      </ReviewTextContainer>
      <ShowMoreContainer onClick={handleShowClick}>
        <ShowMoreText>read more</ShowMoreText>
        <Icon id={'show'} width={40} height={40} viewBox="0 0 40 40" />
      </ShowMoreContainer>
    </ReviewContainer>
  );
}

export default Review;
