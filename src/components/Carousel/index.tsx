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
  transition: 0.5s;
`;

const data = [
  {
    id: 1,
    img: 'images/sonic.png',
    title: 'Sonic 2',
    tags: ['5+', 'HD', 'Action'],
  },
  {
    id: 2,
    img: 'images/panther.png',
    title: 'Black Panther 3',
    tags: ['13+', 'IMAX', 'Action'],
  },
  {
    id: 3,
    img: 'images/morbius.png',
    title: 'Morbius',
    tags: ['16+', '4K', 'Horror'],
  },
  {
    id: 4,
    img: 'images/sonic.png',
    title: 'Sonic 2',
    tags: ['5+', 'HD', 'Action'],
  },
  {
    id: 5,
    img: 'images/panther.png',
    title: 'Black Panther 3',
    tags: ['13+', 'IMAX', 'Action'],
  },
  {
    id: 6,
    img: 'images/morbius.png',
    title: 'Morbius',
    tags: ['16+', '4K', 'Horror'],
  },
];

const FIRST_SLIDE_OFFSET = 216;
const LAST_SLIDE_OFFSET = 158;

function Carousel() {
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
    updateCurrentIndex(index);
    scrollToCurrentItem(checkIndex(index));
  };

  const handleSliderScroll = useCallback(() => {
    if (
      sliderRef.current &&
      Math.abs(sliderRef.current.scrollTop - prevScroll) >= 100
    ) {
      if (sliderRef.current.scrollTop > prevScroll) {
        updateCurrentIndex(currentIndex + 1);
      } else {
        updateCurrentIndex(currentIndex - 1);
      }

      setPrevScroll(sliderRef.current.scrollTop);
    }
  }, [currentIndex, prevScroll, updateCurrentIndex]);

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
        <img src={data[currentIndex].img} alt="poster" width={262} />
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
        <ImageSlider ref={sliderRef} onScroll={handleSliderScroll}>
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

export default Carousel;
