import Icon from 'components/Icon';
import { styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import Vibrant from 'node-vibrant/lib/bundle';

const ReviewContainer = styled.div<{ bgColor: string }>`
  border-radius: 20px;
  background: ${(props) => props.bgColor};
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

const ReviewTextContainer = styled.div`
  width: 326px;
  height: 217px;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;

const ReviewText = styled.p`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 16px;
  font-style: italic;
  font-weight: 300;
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

function Review() {
  const [opened, setOpened] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');

  const reviewRef = useRef<HTMLDivElement>(null);

  const handleShowClick = () => {
    if (reviewRef.current) {
      reviewRef.current.style.height = opened ? '217px' : '450px';
      setOpened(!opened);
    }
  };

  const imageUrl =
    'https://s3-alpha-sig.figma.com/img/f0cd/eaad/9c1523083ead593c088a9515c7e60053?Expires=1696204800&Signature=hLVUuPaI0bZg9HDH~uGsWyjCYDTqI2iVMuVfGxg27b~jA56acfadlS~pUEdesLtolSgzVIeBec40nENKxRhbl3G4V1DvPealjDQLL9lRREWjkX~6I6sETULKNPl1QRg564LhJO9CkX0bQ4tFqg9CAPCESbSh5fS6rlCLUwSghb~Y2DU97CJbhjKXlkaNXQCbTV-q9sJbF3eu9Jy6FVDuro3CdG~i~3P0g1M9uHv8BPaYhX1ON18gMymZINOinZKkpYrQ8-FQAuNvXCtW73ZPPKMGuyW8oly~WorScGy586IdLZ3y6frn3ojtovoWUz9M5G28EAlW74KmqCT0nDOE2w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4';

  useEffect(() => {
    (async () => {
      const palette = await Vibrant.from(imageUrl).getPalette();
      setBackgroundColor(palette.DarkMuted?.hex ?? '#000');
    })();
  }, []);

  return (
    <ReviewContainer bgColor={backgroundColor} onClick={handleShowClick}>
      <ReviewTitle>Review</ReviewTitle>
      <AuthorDescription>from Stanislav Lebedyantsev</AuthorDescription>
      <ReviewTextContainer ref={reviewRef}>
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
