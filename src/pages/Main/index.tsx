import { styled } from 'styled-components';
import Header from '../../components/Header';

const TrailerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 150px;
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

function Main() {
  return (
    <div>
      <Header />
      <TrailerContainer>
        <DescriptionContainer>
          <TrailerTitle>THE BATMAN</TrailerTitle>
          <TrailerDescription>
            Batman is called to intervene when the mayor of Gotham City is
            murdered. Soon, his investigation leads him to uncover a web of
            corruption, linked to his own dark past.
          </TrailerDescription>
        </DescriptionContainer>
        <TrailerMock src="images/trailer-mock.png" alt="trailer" />
      </TrailerContainer>
    </div>
  );
}

export default Main;
