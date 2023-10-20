import { styled } from 'styled-components';
import Icon from 'components/Icon';
import { useCallback, useRef, useState } from 'react';

type HorizontalCarouselProps = {
  data: Date[];
  onClick?: (date: Date) => Promise<void>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Slider = styled.div`
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
`;

const StyledIcon = styled(Icon)`
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.5;
  }
`;

const Slide = styled.div<{ $isActive: boolean; $isNearActive: boolean }>`
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
   `};
  ${(props) => props.$isNearActive && `width: 114px; height: 112px;`};
`;

const Divider = styled.div`
  width: 764px;
  height: 2px;
  flex-shrink: 0;
  background-color: #fff;
`;

const FIRST_SLIDE_OFFSET = 348;
const LAST_SLIDE_OFFSET = 298;

function Carousel({ data, onClick }: HorizontalCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const checkIndex = useCallback(
    (index: number) => {
      if (index < 0) return data.length - 1;
      else if (index >= data.length) return 0;
      return index;
    },
    [data]
  );

  const scrollToCurrentItem = useCallback(
    (index: number) => {
      const x =
        currentIndex <= index
          ? itemsRef.current[index].offsetLeft - FIRST_SLIDE_OFFSET
          : itemsRef.current[index].offsetLeft - LAST_SLIDE_OFFSET;

      sliderRef.current?.scrollTo(x, 0);
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
    if (onClick) {
      onClick(data[checkIndex(index)]);
    }
  };

  const bindRef = (element: HTMLDivElement | null, index: number) => {
    if (element) {
      itemsRef.current[index] = element;
    }
  };

  return (
    <Wrapper>
      <Divider />
      <SliderContainer>
        <StyledIcon
          id="arrows-left"
          width={55}
          height={34}
          viewBox="0 0 55 34"
          onClick={() => handleItemClick(currentIndex - 1)}
        />
        <Slider ref={sliderRef}>
          {data.map((item, index) => (
            <Slide
              key={index}
              onClick={() => handleItemClick(index)}
              $isActive={index === currentIndex}
              $isNearActive={
                index === currentIndex - 1 || index === currentIndex + 1
              }
              ref={(elem) => bindRef(elem, index)}
            >
              {item.getDate()}
            </Slide>
          ))}
        </Slider>
        <StyledIcon
          id="arrows-right"
          width={55}
          height={34}
          viewBox="0 0 55 34"
          onClick={() => handleItemClick(currentIndex + 1)}
        />
      </SliderContainer>
      <Divider />
    </Wrapper>
  );
}

export default Carousel;
