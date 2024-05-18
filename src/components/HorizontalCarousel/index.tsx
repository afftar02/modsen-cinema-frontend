import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';

import {
  Divider,
  Slide,
  Slider,
  SliderContainer,
  StyledIcon,
  Wrapper,
} from './styled';
import { HorizontalCarouselProps } from './types';

function HorizontalCarousel({ data, value, onClick }: HorizontalCarouselProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const [prevIndex, setPrevIndex] = useState(0);

  const { width } = useWindowDimensions();

  const firstSlideOffset = useMemo(() => {
    if (width > 1000) return 335;
    else if (width > 700) return 195;
    else return 145;
  }, [width]);
  const lastSlideOffset = useMemo(() => {
    if (width > 1000) return 298;
    else if (width > 700) return 158;
    else return 96;
  }, [width]);

  const currentIndex = useMemo(() => {
    const index = data.findIndex((item) => item.getDate() === value.getDate());

    return index > 0 ? index : 0;
  }, [data, value]);

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
        prevIndex <= index
          ? itemsRef.current[index].offsetLeft - firstSlideOffset
          : itemsRef.current[index].offsetLeft - lastSlideOffset;

      sliderRef.current?.scrollTo(x, 0);
    },
    [firstSlideOffset, lastSlideOffset, prevIndex]
  );

  const handleItemClick = (index: number) => {
    if (onClick) {
      setPrevIndex(currentIndex);
      onClick(data[checkIndex(index)]);
    }
  };

  const bindRef = (element: HTMLDivElement | null, index: number) => {
    if (element) {
      itemsRef.current[index] = element;
    }
  };

  useEffect(() => {
    scrollToCurrentItem(currentIndex);
  }, [checkIndex, currentIndex, scrollToCurrentItem]);

  return (
    <Wrapper>
      <Divider />
      <SliderContainer>
        {width > 700 && (
          <StyledIcon
            id="arrows-left"
            width={55}
            height={34}
            viewBox="0 0 55 34"
            onClick={() => handleItemClick(currentIndex - 1)}
          />
        )}
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
        {width > 700 && (
          <StyledIcon
            id="arrows-right"
            width={55}
            height={34}
            viewBox="0 0 55 34"
            onClick={() => handleItemClick(currentIndex + 1)}
          />
        )}
      </SliderContainer>
      <Divider />
    </Wrapper>
  );
}

export default HorizontalCarousel;
