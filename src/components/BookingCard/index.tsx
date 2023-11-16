import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BASE_UPLOADS_URL } from 'constants/BaseApiUrl';
import { Icon } from 'modsen-library';

import {
  AdditionalInfoBlock,
  CancelButton,
  CancelIcon,
  CardContainer,
  DateText,
  Divider,
  InfoBlock,
  Price,
  Rating,
  SeatsNumber,
  StyledImage,
  StyledLink,
  TicketNumber,
  TicketNumberBlock,
  TicketSumContainer,
  Title,
  TitleBlock,
} from './styled';
import { BookingCardProps } from './types';

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

export default memo(BookingCard);
