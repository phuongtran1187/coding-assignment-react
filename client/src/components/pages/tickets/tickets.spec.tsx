import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tickets } from './tickets';
import { useTickets, useUsers, useSearchParamsHandler } from '@/hooks';

jest.mock('@/hooks', () => ({
  useTickets: jest.fn(),
  useUsers: jest.fn(),
  useSearchParamsHandler: jest.fn(),
}));

jest.mock('@/components/presentation', () => ({
  TicketList: ({ tickets, isLoading, isError }: any) => (
    <div data-testid="ticket-list">
      {isLoading && <span>Loading...</span>}
      {isError && <span>Error</span>}
      {tickets?.map((t: any) => (
        <div key={t.id} data-testid={`ticket-${t.id}`}>
          {t.description} - {t.assignee?.name ?? 'Unassigned'}
        </div>
      ))}
    </div>
  ),
  TicketSummary: ({ totalTickets, completedTickets, incompleteTickets }: any) => (
    <div data-testid="ticket-summary">
      Total: {totalTickets}, Completed: {completedTickets}, Incomplete: {incompleteTickets}
    </div>
  ),
}));

describe('Tickets', () => {
  const mockTickets = [
    { id: 1, description: 'Ticket 1', completed: false, assigneeId: 1 },
    { id: 2, description: 'Ticket 2', completed: true, assigneeId: 2 },
    { id: 3, description: 'Ticket 3', completed: false, assigneeId: null },
  ];

  const mockUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  const mockSetFilter = jest.fn();
  const mockRemoveFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useUsers as jest.Mock).mockReturnValue({ users: mockUsers });

    (useSearchParamsHandler as jest.Mock).mockReturnValue({
      get: () => null, // default: 'all'
      set: mockSetFilter,
      remove: mockRemoveFilter,
    });

    (useTickets as jest.Mock).mockReturnValue({
      tickets: mockTickets,
      completeTickets: mockTickets.filter((t) => t.completed),
      incompleteTickets: mockTickets.filter((t) => !t.completed),
      isLoading: false,
      isError: false,
    });
  });

  it('should render tickets with correct assignee names', () => {
    render(<Tickets />);

    expect(screen.getByTestId('ticket-summary')).toHaveTextContent(
      'Total: 3, Completed: 1, Incomplete: 2'
    );

    expect(screen.getByTestId('ticket-1')).toHaveTextContent('Ticket 1 - Alice');
    expect(screen.getByTestId('ticket-2')).toHaveTextContent('Ticket 2 - Bob');
    expect(screen.getByTestId('ticket-3')).toHaveTextContent('Ticket 3 - Unassigned');
  });

  it('changes filter when clicking filter buttons', async () => {
    const user = userEvent.setup();
    render(<Tickets />);

    await user.click(screen.getByRole('button', { name: 'Completed' }));
    expect(mockSetFilter).toHaveBeenCalledWith('filter', 'completed');

    await user.click(screen.getByRole('button', { name: 'Incomplete' }));
    expect(mockSetFilter).toHaveBeenCalledWith('filter', 'incomplete');

    await user.click(screen.getByRole('button', { name: 'All' }));
    expect(mockRemoveFilter).toHaveBeenCalledWith('filter');
  });

  it('should render successfully', () => {
    const { baseElement } = render(<Tickets />);
    expect(baseElement).toBeTruthy();
  });
});
