import { render, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { TicketDetails } from './ticket-details';
import { useTicket, useUsers } from '@/hooks';

jest.mock('@/hooks', () => ({
  useTicket: jest.fn(),
  useUsers: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('@/components/presentation', () => ({
  Ticket: ({ ticket, isLoading, isError }: any) => (
    <div data-testid="ticket">
      {isLoading && <span>Loading...</span>}
      {isError && <span>Error</span>}
      {ticket && (
        <>
          <span data-testid="ticket-description">{ticket.description}</span>
          <span data-testid="ticket-assignee">{ticket.assignee?.name ?? 'Unassigned'}</span>
        </>
      )}
    </div>
  ),
}));

describe('TicketDetails', () => {
  const mockUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useUsers as jest.Mock).mockReturnValue({ users: mockUsers });
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  it('renders ticket with correct assignee', () => {
    (useTicket as jest.Mock).mockReturnValue({
      ticket: { id: 1, description: 'Ticket description', assigneeId: 1, completed: false },
      isLoading: false,
      isError: false,
    });

    render(<TicketDetails />);

    expect(screen.getByText('Ticket #1')).toBeInTheDocument();
    expect(screen.getByTestId('ticket-description')).toHaveTextContent('Ticket description');
    expect(screen.getByTestId('ticket-assignee')).toHaveTextContent('Alice');
  });

  it('shows unassigned when ticket has no assignee', () => {
    (useTicket as jest.Mock).mockReturnValue({
      ticket: { id: 2, description: 'Ticket description 2', assigneeId: null, completed: true },
      isLoading: false,
      isError: false,
    });
    (useParams as jest.Mock).mockReturnValue({ id: '2' });

    render(<TicketDetails />);

    expect(screen.getByText('Ticket #2')).toBeInTheDocument();
    expect(screen.getByTestId('ticket-assignee')).toHaveTextContent('Unassigned');
  });

  it('should render successfully', () => {
    const { baseElement } = render(<TicketDetails />);
    expect(baseElement).toBeTruthy();
  });
  
});
