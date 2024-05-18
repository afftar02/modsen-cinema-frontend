import { useCallback, useEffect, useRef, useState } from 'react';
import useWindowDimensions from 'hooks/useWindowDimensions';

import { FIRST_SLIDE_OFFSET, LAST_SLIDE_OFFSET } from './config';
import {
  ArrowsContainer,
  CurrentContainer,
  CurrentImage,
  GenreText,
  Image,
  ImageSlider,
  InfoContainer,
  QualityText,
  Slide,
  SliderContainer,
  StyledIcon,
  StyledLink,
  Tag,
  TagsContainer,
  Title,
  Wrapper,
} from './styled';
import { VerticalCarouselProps } from './types';

function VerticalCarousel({
  data,
  titleColor,
  buttonsColor,
  linkPrefix,
}: VerticalCarouselProps) {
  const [canUserScroll, allowUserScroll] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const currentItemRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const { width } = useWindowDimensions();

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
      <StyledLink to={`${linkPrefix}/${data.at(currentIndex)?.id}`}>
        <CurrentContainer ref={currentItemRef}>
          <CurrentImage
            src={data.at(currentIndex)?.posterUrl}
            alt="poster"
            width={width > 700 ? 262 : 162}
          />
          <InfoContainer>
            <Title $color={titleColor}>{data.at(currentIndex)?.title}</Title>
            <TagsContainer>
              <Tag>
                <span>{data.at(currentIndex)?.ageRestriction}+</span>
              </Tag>
              <Tag>
                <QualityText>{data.at(currentIndex)?.quality}</QualityText>
              </Tag>
              {data.at(currentIndex)?.genre && (
                <Tag>
                  <GenreText>{data.at(currentIndex)?.genre}</GenreText>
                </Tag>
              )}
            </TagsContainer>
          </InfoContainer>
        </CurrentContainer>
      </StyledLink>
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
              $isActive={index === currentIndex}
              ref={(elem) => bindRef(elem, index)}
            >
              <Image src={item.posterUrl} alt="slide" />
            </Slide>
          ))}
        </ImageSlider>
        <ArrowsContainer>
          <StyledIcon
            id="arrow-up"
            width={22}
            height={32}
            viewBox="0 0 22 32"
            fill="none"
            stroke={buttonsColor}
            onClick={() => handleItemClick(currentIndex - 1)}
          />
          <StyledIcon
            id="arrow-down"
            width={22}
            height={32}
            viewBox="0 0 22 32"
            fill="none"
            stroke={buttonsColor}
            onClick={() => handleItemClick(currentIndex + 1)}
          />
        </ArrowsContainer>
      </SliderContainer>
    </Wrapper>
  );
}

export default VerticalCarousel;
