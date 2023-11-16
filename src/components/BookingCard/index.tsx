import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BASE_UPLOADS_URL } from 'constants/BaseApiUrl';
import { motion } from 'framer-motion';
import { Icon } from 'modsen-library';
import { styled } from 'styled-components';

import { BookingCardProps } from './types';

const CardContainer = styled(motion.div)`
  display: flex;
  width: 600px;
  height: 200px;
  flex-shrink: 0;
  border-radius: 18px;
  background: rgba(118, 118, 120, 0.9);
  align-items: center;

  @media (max-width: 650px) {
    width: 100%;
    height: 160px;
  }
  @media (max-width: 430px) {
    height: 200px;
  }
`;

const StyledImage = styled.img`
  width: 145px;
  height: 200px;
  border-radius: 18px;
  box-shadow: 0 7px 7px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;

  @media (max-width: 650px) {
    width: 120px;
    height: 160px;
  }
`;

const InfoBlock = styled.div`
  width: 100%;
  position: relative;
  padding: 16px 30px 0 20px;

  @media (max-width: 650px) {
    padding: 6px 14px 0 8px;
  }
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

  @media (max-width: 430px) {
    font-size: 22px;
    max-width: 140px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
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

  @media (max-width: 650px) {
    margin-top: 0;
  }
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

  @media (max-width: 650px) {
    width: 50%;
    margin-top: 6px;
    margin-bottom: 4px;
  }
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

  @media (max-width: 430px) {
    right: 10px;
  }
`;

const CancelIcon = styled(Icon)`
  margin-left: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
`;

function BookingCard({
  ticket,
  onCancelClick,
  isOver = false,
}: BookingCardProps) {
  const { t } = useTranslation();

  const price = useMemo(() => {
    if (ticket.seats) {
      const result =
        ticket.seats.reduce((sum, seat) => sum + seat.price, 0) *
        (1 - ticket.discount / 100);

      return result.toFixed(1);
    }
  }, [ticket]);

  const dateInfo = useMemo(() => {
    if (ticket.session) {
      const date = new Date(ticket.session?.start);

      return `${t('date_text')}: ${t(
        `months.${date.getMonth() + 1}`
      )} ${date.getDate()}, ${date.getFullYear()}`;
    }
  }, [t, ticket.session]);

  return (
    <CardContainer
      initial={{ scale: 0.5 }}
      whileInView={{ scale: 1 }}
      exit={{ scale: 0.5 }}
      transition={{
        duration: 0.5,
      }}
      viewport={{ once: true }}
    >
      <StyledLink to={`/film/${ticket.movie?.id}`}>
        <StyledImage
          src={BASE_UPLOADS_URL + ticket.movie?.poster?.filename}
          alt={'poster'}
        />
      </StyledLink>
      <InfoBlock>
        <div>
          <TitleBlock>
            <StyledLink to={`/film/${ticket.movie?.id}`}>
              <Title>{ticket.movie?.title}</Title>
            </StyledLink>
            <div>
              <Rating>{ticket.movie?.rating}</Rating>
              <Icon id={'star'} width={20} height={20} viewBox="0 0 39 35" />
            </div>
          </TitleBlock>
          <AdditionalInfoBlock>
            <DateText>{dateInfo}</DateText>
            <TicketNumberBlock>
              <Icon id={'ticket'} width={23} height={23} viewBox="0 0 23 23" />
              <TicketNumber>TC{ticket.id}</TicketNumber>
            </TicketNumberBlock>
          </AdditionalInfoBlock>
        </div>
        <Divider />
        <TicketSumContainer>
          <SeatsNumber>
            {ticket.seats?.length} {t('seats_text')}
          </SeatsNumber>
          <Price>{price} $</Price>
        </TicketSumContainer>
        {!isOver && (
          <CancelButton onClick={onCancelClick}>
            <span>{t('cancel_button_text')}</span>
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
