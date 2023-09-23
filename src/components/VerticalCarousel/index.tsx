import { styled } from 'styled-components';
import Icon from '../Icon';
import { useCallback, useEffect, useRef, useState } from 'react';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const CurrentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const CurrentImage = styled.img`
  border-radius: 10px;
`;

const InfoContainer = styled.div`
  text-align: center;

  margin-top: 23px;
`;

const Title = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 32px;
  font-weight: 500;
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 10px;
`;

const Tag = styled.div`
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

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  overflow: hidden;

  margin-left: 96px;
`;

const ImageSlider = styled.div`
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

const ArrowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 86px;

  margin-left: 37px;
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.5;
  }
`;

const Slide = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: 0.5s;
  cursor: pointer;

  ${(props) =>
    props.isActive
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

const Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  transition: 0.5s;
`;

const data = [
  {
    id: 1,
    img: 'https://s3-alpha-sig.figma.com/img/821b/2048/713c16663293d937cb3d04031a4a08f3?Expires=1696204800&Signature=Izdgd7EwWVtHwI~0tQNtnlnuI4nJAUpIz47qAgSIEZVJVT~Ya78c6qHQ2nOWqS~WbTal6Y2MeKvAykI5ULfg3quIn9wyUqh8pqMl8Zq03PhCL2tLq3hrALxcAoS4ebkAjea13KiQe32bkLC9RBc-sp7qVCM7QDa9C6o6gUElUzKz~~slJEvnwovmiMqkLTDMu46Iabm5PWf479CcIjDExh6GUFoWlkRHaBqvMVR9h5svkB76PHyY06AnltQ2snyXnGrEh6yNhqdiiuLX5Ok~JqM0pF8Lls2fwSm1KqhCDZXd15Aa3dZuSsiwbFCvil~GZzyZDVCZhna61Ai-srtByA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    title: 'Sonic 2',
    tags: ['5+', 'HD', 'Action'],
  },
  {
    id: 2,
    img: 'https://s3-alpha-sig.figma.com/img/c076/b75c/cf94c3c0a7cb4ea44425607d001a745f?Expires=1696204800&Signature=FZHK0nZ-JCtvz9Ahj3LMRYNHxCcikF2qZsbsbyuyvvBzbMPyqtEvba~SLo65cufgGgv6Zmpj8nR28WQrIPJDo6oDOoeKC7hAMQPVkFzbYVm6EEpjLSTFPxtq65-aq7C73~2fFwmSjnCFYxA4PZSOF~Yx~SUa3rbYg-avz~Z5eR6pHG6V7jwap92q3yJqoB8dpMJSA~~LrS6SI9HI3bAAjyspbqq0K70QsG7~g6GLdqcs8H6wn-607cvUBfGio1o-HuFG8SUEeM9dWlPHABlJ6F95Ij~i36bBECy8Y3oQh66CEwjxjXSf5nAfkeuPRH3xQaRcaRI43SsbOiWVR4oJ0Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    title: 'Black Panther 3',
    tags: ['13+', 'IMAX', 'Action'],
  },
  {
    id: 3,
    img: 'https://s3-alpha-sig.figma.com/img/f0cd/eaad/9c1523083ead593c088a9515c7e60053?Expires=1696204800&Signature=hLVUuPaI0bZg9HDH~uGsWyjCYDTqI2iVMuVfGxg27b~jA56acfadlS~pUEdesLtolSgzVIeBec40nENKxRhbl3G4V1DvPealjDQLL9lRREWjkX~6I6sETULKNPl1QRg564LhJO9CkX0bQ4tFqg9CAPCESbSh5fS6rlCLUwSghb~Y2DU97CJbhjKXlkaNXQCbTV-q9sJbF3eu9Jy6FVDuro3CdG~i~3P0g1M9uHv8BPaYhX1ON18gMymZINOinZKkpYrQ8-FQAuNvXCtW73ZPPKMGuyW8oly~WorScGy586IdLZ3y6frn3ojtovoWUz9M5G28EAlW74KmqCT0nDOE2w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    title: 'Morbius',
    tags: ['16+', '4K', 'Horror'],
  },
  {
    id: 4,
    img: 'https://s3-alpha-sig.figma.com/img/821b/2048/713c16663293d937cb3d04031a4a08f3?Expires=1696204800&Signature=Izdgd7EwWVtHwI~0tQNtnlnuI4nJAUpIz47qAgSIEZVJVT~Ya78c6qHQ2nOWqS~WbTal6Y2MeKvAykI5ULfg3quIn9wyUqh8pqMl8Zq03PhCL2tLq3hrALxcAoS4ebkAjea13KiQe32bkLC9RBc-sp7qVCM7QDa9C6o6gUElUzKz~~slJEvnwovmiMqkLTDMu46Iabm5PWf479CcIjDExh6GUFoWlkRHaBqvMVR9h5svkB76PHyY06AnltQ2snyXnGrEh6yNhqdiiuLX5Ok~JqM0pF8Lls2fwSm1KqhCDZXd15Aa3dZuSsiwbFCvil~GZzyZDVCZhna61Ai-srtByA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    title: 'Sonic 2',
    tags: ['5+', 'HD', 'Action'],
  },
  {
    id: 5,
    img: 'https://s3-alpha-sig.figma.com/img/c076/b75c/cf94c3c0a7cb4ea44425607d001a745f?Expires=1696204800&Signature=FZHK0nZ-JCtvz9Ahj3LMRYNHxCcikF2qZsbsbyuyvvBzbMPyqtEvba~SLo65cufgGgv6Zmpj8nR28WQrIPJDo6oDOoeKC7hAMQPVkFzbYVm6EEpjLSTFPxtq65-aq7C73~2fFwmSjnCFYxA4PZSOF~Yx~SUa3rbYg-avz~Z5eR6pHG6V7jwap92q3yJqoB8dpMJSA~~LrS6SI9HI3bAAjyspbqq0K70QsG7~g6GLdqcs8H6wn-607cvUBfGio1o-HuFG8SUEeM9dWlPHABlJ6F95Ij~i36bBECy8Y3oQh66CEwjxjXSf5nAfkeuPRH3xQaRcaRI43SsbOiWVR4oJ0Q__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    title: 'Black Panther 3',
    tags: ['13+', 'IMAX', 'Action'],
  },
  {
    id: 6,
    img: 'https://s3-alpha-sig.figma.com/img/f0cd/eaad/9c1523083ead593c088a9515c7e60053?Expires=1696204800&Signature=hLVUuPaI0bZg9HDH~uGsWyjCYDTqI2iVMuVfGxg27b~jA56acfadlS~pUEdesLtolSgzVIeBec40nENKxRhbl3G4V1DvPealjDQLL9lRREWjkX~6I6sETULKNPl1QRg564LhJO9CkX0bQ4tFqg9CAPCESbSh5fS6rlCLUwSghb~Y2DU97CJbhjKXlkaNXQCbTV-q9sJbF3eu9Jy6FVDuro3CdG~i~3P0g1M9uHv8BPaYhX1ON18gMymZINOinZKkpYrQ8-FQAuNvXCtW73ZPPKMGuyW8oly~WorScGy586IdLZ3y6frn3ojtovoWUz9M5G28EAlW74KmqCT0nDOE2w__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    title: 'Morbius',
    tags: ['16+', '4K', 'Horror'],
  },
];

const FIRST_SLIDE_OFFSET = 216;
const LAST_SLIDE_OFFSET = 158;

function VerticalCarousel() {
  const [canUserScroll, allowUserScroll] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const currentItemRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const checkIndex = useCallback((index: number) => {
    if (index < 0) return data.length - 1;
    else if (index >= data.length) return 0;
    return index;
  }, []);

  const scrollToCurrentItem = useCallback(
    (index: number) => {
      const y =
        currentIndex <= index
          ? itemsRef.current[index].offsetTop - FIRST_SLIDE_OFFSET
          : itemsRef.current[index].offsetTop - LAST_SLIDE_OFFSET;

      sliderRef.current?.scrollTo(0, y);
    },
    [currentIndex]
  );

  const updateCurrentIndex = useCallback(
    (index: number) => {
      setCurrentIndex(checkIndex(index));
    },
    [checkIndex]
  );

  const handleItemClick = (index: number) => {
    allowUserScroll(false);
    updateCurrentIndex(index);
    scrollToCurrentItem(checkIndex(index));
  };

  const handleSliderScroll = useCallback(() => {
    if (
      sliderRef.current &&
      Math.abs(sliderRef.current.scrollTop - prevScroll) >= 110 &&
      canUserScroll
    ) {
      if (sliderRef.current.scrollTop > prevScroll) {
        updateCurrentIndex(currentIndex + 1);
      } else if (sliderRef.current.scrollTop < prevScroll) {
        updateCurrentIndex(currentIndex - 1);
      }

      setPrevScroll(sliderRef.current.scrollTop);
    }
  }, [currentIndex, prevScroll, updateCurrentIndex, canUserScroll]);

  const bindRef = (element: HTMLDivElement | null, index: number) => {
    if (element) {
      itemsRef.current[index] = element;
    }
  };

  useEffect(() => {
    currentItemRef.current?.animate(
      [
        { bottom: '-50px', opacity: 0 },
        { bottom: 0, opacity: 1 },
      ],
      {
        duration: 500,
        iterations: 1,
      }
    );
  }, [currentIndex]);

  return (
    <Wrapper>
      <CurrentContainer ref={currentItemRef}>
        <CurrentImage src={data[currentIndex].img} alt="poster" width={262} />
        <InfoContainer>
          <Title>{data[currentIndex].title}</Title>
          <TagsContainer>
            {data[currentIndex].tags.map((tag, index) => (
              <Tag key={index}>
                <span>{tag}</span>
              </Tag>
            ))}
          </TagsContainer>
        </InfoContainer>
      </CurrentContainer>
      <SliderContainer>
        <ImageSlider
          ref={sliderRef}
          onScroll={handleSliderScroll}
          onMouseEnter={() => allowUserScroll(true)}
        >
          {data.map((item, index) => (
            <Slide
              key={item.id}
              onClick={() => handleItemClick(index)}
              isActive={index === currentIndex}
              ref={(elem) => bindRef(elem, index)}
            >
              <Image src={item.img} alt="slide" />
            </Slide>
          ))}
        </ImageSlider>
        <ArrowsContainer>
          <StyledIcon
            id="arrow-up"
            width={22}
            height={32}
            viewBox="0 0 22 32"
            onClick={() => handleItemClick(currentIndex - 1)}
          />
          <StyledIcon
            id="arrow-down"
            width={22}
            height={32}
            viewBox="0 0 22 32"
            onClick={() => handleItemClick(currentIndex + 1)}
          />
        </ArrowsContainer>
      </SliderContainer>
    </Wrapper>
  );
}

export default VerticalCarousel;
