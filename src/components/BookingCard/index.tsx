import { styled } from 'styled-components';
import Icon from 'components/Icon';
import { Link } from 'react-router-dom';

type BookingCardProps = {
  isOver?: boolean;
};

const CardContainer = styled.div`
  display: flex;
  width: 600px;
  height: 200px;
  flex-shrink: 0;
  border-radius: 18px;
  background: rgba(118, 118, 120, 0.9);
`;

const StyledImage = styled.img`
  width: 145px;
  height: 200px;
  border-radius: 18px;
  box-shadow: 0 7px 7px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const InfoBlock = styled.div`
  width: 100%;
  position: relative;
  padding: 16px 30px 0 20px;
`;

const TitleBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 26px;
  font-weight: 700;
  height: 36px;
`;

const Rating = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 23px;
  font-weight: 700;
  margin-right: 8px;
`;

const AdditionalInfoBlock = styled.div`
  margin-top: 14px;
`;

const DateText = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 22px;
  font-weight: 300;
`;

const TicketNumberBlock = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
`;

const TicketNumber = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 300;
  margin-left: 7px;
`;

const Divider = styled.div`
  width: 364px;
  height: 2px;
  border-radius: 18px;
  background: #d9d9d9;
  margin-top: 12px;
  margin-bottom: 10px;
`;

const TicketSumContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SeatsNumber = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 300;
`;

const Price = styled.span`
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 500;
`;

const CancelButton = styled.button`
  position: absolute;
  right: 27px;
  bottom: 9px;
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  font-weight: 300;
  width: 120px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: #d98639;
  border: none;
  cursor: pointer;
  transition: background 0.1s ease-in-out;

  &:hover {
    background: #bd6f28;
  }
`;

const CancelIcon = styled(Icon)`
  margin-left: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  height: 36px;
`;

function BookingCard({ isOver = false }: BookingCardProps) {
  return (
    <CardContainer>
      <StyledLink to={'/film/5'}>
        <StyledImage
          src={
            'https://s3-alpha-sig.figma.com/img/e5cc/8136/0873c95c1344b596f117082814368ada?Expires=1696204800&Signature=ee6H4MIbxTj7FuTzTQzCkRG4lA-QCOEg0x7LcunO98obbNVT~iN3Pb8FUP2zFRZmbjeld0ADi69Sd7dbNyYwcnedM~5EtH5-~3DYkJ7Rx0WkbRCLZQRXuC2Un-BIgM0cPwakhVl2n3YsJ6Az2qGHpVGg7it9fj~iVMgH1541-XjxcKLKpqyUCbNeq-pJTcRsYJHbs34iudErujDqkumdt754lX542oerYochVecDcTJkwxH85HepxZ3TmDN3Z2Qk8TSUrZXanHanM1r1gzLy~-IoXmCDw~gDIkEgTRvOCE7VNaOM3y0w~cae0HkYPjxrMGBFh9i3wOSsxUGZUiE~Tg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
          }
          alt={'poster'}
        />
      </StyledLink>
      <InfoBlock>
        <div>
          <TitleBlock>
            <StyledLink to={'/film/5'}>
              <Title>Avatar 2</Title>
            </StyledLink>
            <div>
              <Rating>8,9</Rating>
              <Icon id={'star'} width={20} height={20} viewBox="0 0 39 35" />
            </div>
          </TitleBlock>
          <AdditionalInfoBlock>
            <DateText>Date: February 24, 2022</DateText>
            <TicketNumberBlock>
              <Icon id={'ticket'} width={23} height={23} viewBox="0 0 23 23" />
              <TicketNumber>TC890023</TicketNumber>
            </TicketNumberBlock>
          </AdditionalInfoBlock>
        </div>
        <Divider />
        <TicketSumContainer>
          <SeatsNumber>4 seats</SeatsNumber>
          <Price>48 $</Price>
        </TicketSumContainer>
        {!isOver && (
          <CancelButton>
            <span>Cancel</span>
            <CancelIcon
              id={'cancel'}
              width={17}
              height={19}
              viewBox="0 0 17 19"
            />
          </CancelButton>
        )}
      </InfoBlock>
    </CardContainer>
  );
}

export default BookingCard;
