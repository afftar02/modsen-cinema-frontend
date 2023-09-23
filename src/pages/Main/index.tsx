import { styled } from 'styled-components';
import Header from '../../components/Header';
import VerticalCarousel from '../../components/VerticalCarousel';

const Flex = styled.div<{
  marginTop?: number;
  marginBottom?: number;
  height?: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) => props.height && `height: ${props.height}px`};

  ${(props) => props.marginTop && `margin-top: ${props.marginTop}px`};
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px`};
`;

const DescriptionContainer = styled.div`
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 300;
  color: #ffffff;

  z-index: 1;
`;

const TrailerTitle = styled.span`
  font-size: 48px;
`;

const TrailerDescription = styled.p`
  width: 594px;
  margin: 10px 0 0;

  font-size: 32px;
`;

const TrailerMock = styled.img`
  cursor: pointer;

  position: relative;
  left: -105px;
`;

const CurrentMovieTitle = styled.span`
  color: #fff;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 48px;
  font-style: italic;
  font-weight: 300;
  text-transform: uppercase;
`;

const CurrentMovieDescription = styled.p`
  width: 630px;
  margin: 25px 0 0;

  color: #fff;
  font-family: 'Inria Sans', sans-serif;
  font-size: 40px;
  font-style: italic;
  font-weight: 300;
`;

const StyledYear = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  font-weight: 300;
`;

function Main() {
  return (
    <div>
      <Header />
      <Flex marginTop={150}>
        <DescriptionContainer>
          <TrailerTitle>THE BATMAN</TrailerTitle>
          <TrailerDescription>
            Batman is called to intervene when the mayor of Gotham City is
            murdered. Soon, his investigation leads him to uncover a web of
            corruption, linked to his own dark past.
          </TrailerDescription>
        </DescriptionContainer>
        <TrailerMock src="images/trailer-mock.png" alt="trailer" />
      </Flex>
      <Flex marginTop={86} height={497}>
        <div>
          <CurrentMovieTitle>Now in the Cinema</CurrentMovieTitle>
          <CurrentMovieDescription>
            Watch great Movies in the best cinema! We care about your comfort.
            Book tickets right now!
          </CurrentMovieDescription>
        </div>
        <VerticalCarousel />
      </Flex>
      <Flex marginTop={150}>
        <img src="images/studios.svg" alt="studios" />
      </Flex>
      <Flex marginTop={40} marginBottom={17}>
        <StyledYear>2023</StyledYear>
      </Flex>
    </div>
  );
}

export default Main;
