import { useTranslation } from 'react-i18next';
import { TicketType } from 'types/Ticket';

export function useTicketDate(ticket: TicketType) {
  const { t } = useTranslation();

  if (ticket.session) {
    const date = new Date(ticket.session?.start);

    return `${t('date_text')}: ${t(
      `months.${date.getMonth() + 1}`
    )} ${date.getDate()}, ${date.getFullYear()}`;
  }

  return '';
}
