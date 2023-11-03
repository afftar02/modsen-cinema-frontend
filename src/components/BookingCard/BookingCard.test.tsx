import { render, screen, fireEvent } from '@testing-library/react';
import BookingCard from './index';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import 'intersectionObserverMock';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      switch (key) {
        case 'date_text':
          return 'Date';
        case 'months.1':
          return 'January';
        case 'seats_text':
          return 'seats';
        case 'cancel_button_text':
          return 'Cancel';
        default:
          break;
      }
    },
  }),
}));

describe('BookingCard', () => {
  const ticket = {
    id: 1,
    isPaid: true,
    isMissed: false,
    isVisited: false,
    movie: {
      id: 1,
      title: 'Test Movie',
      rating: 4.5,
      description: 'Description',
      ageRestriction: 12,
      quality: '4K',
      start: new Date('2023-01-01'),
      author: 'Christofer Nolan',
      poster: {
        id: 1,
        mimetype: 'image/jpg',
        size: 332443432,
        filename: 'test-poster.jpg',
      },
    },
    seats: [
      {
        id: 1,
        price: 10,
        number: 1,
        row: 1,
      },
      {
        id: 2,
        price: 12,
        number: 2,
        row: 2,
      },
    ],
    discount: 10,
    session: {
      id: 1,
      start: new Date('2023-01-01'),
      end: new Date('2023-01-01'),
      format: '2D',
    },
  };

  it('renders the component with the provided data', () => {
    render(
      <BrowserRouter>
        <BookingCard ticket={ticket} onCancelClick={jest.fn} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('TC1')).toBeInTheDocument();
    expect(screen.getByText('Date: January 1, 2023')).toBeInTheDocument();
    expect(screen.getByText('2 seats')).toBeInTheDocument();
    expect(screen.getByText('19.8 $')).toBeInTheDocument();
  });

  it('invokes onCancelClick when cancel button is clicked', () => {
    const onCancelClick = jest.fn();
    render(
      <BrowserRouter>
        <BookingCard ticket={ticket} onCancelClick={onCancelClick} />
      </BrowserRouter>
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(onCancelClick).toHaveBeenCalled();
  });

  it('handles the isOver prop correctly', () => {
    render(
      <BrowserRouter>
        <BookingCard ticket={ticket} onCancelClick={jest.fn} isOver={true} />
      </BrowserRouter>
    );

    const cancelButton = screen.queryByText('Cancel');
    expect(cancelButton).toBeNull();
  });
});
