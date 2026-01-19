import { useTickets, useUsers, useSearchParamsHandler } from '@/hooks';
import { useMemo } from 'react';
import { TicketList, TicketSummary } from '@/components/presentation';
import { Button } from '@/components/ui/button';
import { Ticket, User } from '@acme/shared-models';


type Filter = 'all' | 'completed' | 'incomplete';

const FILTERS: Record<Filter, { label: string, value: Filter }> = {
  all: { label: 'All', value: 'all' },
  completed: { label: 'Completed', value: 'completed' },
  incomplete: { label: 'Incomplete', value: 'incomplete' },
};

export const Tickets = () => {
  const { tickets, completeTickets, incompleteTickets, isLoading, isError } = useTickets();
  const { users } = useUsers();
  const { get, set, remove } = useSearchParamsHandler();

  const filter = get('filter') ?? 'all';

  const filteredTickets = useMemo(() => {
    if (filter === 'incomplete') {
      return incompleteTickets;
    }
    if (filter === 'completed') {
      return completeTickets;
    }
    return tickets;
  }, [filter, tickets, completeTickets, incompleteTickets]);

  const ticketsWithAssignees = useMemo(() => {
    if (!filteredTickets) {
      return [];
    }

    return filteredTickets.map((t: Ticket) => ({
      ...t,
      assignee: users.find((u: User) => u.id === t.assigneeId) ?? null,
    }));
  }, [filteredTickets, users]);

  const handleFilterChange = (filter: Filter) => {
    if (filter === 'all') {
      remove('filter');
    } else {
      set('filter', filter);
    }
  };

  return (
    <div className='flex flex-col gap-6'>
      <section className='flex flex-col gap-4'>
        <h3 className="text-lg">
          Summary
        </h3>
        <TicketSummary totalTickets={tickets.length} completedTickets={completeTickets.length} incompleteTickets={incompleteTickets.length} isLoading={isLoading} />
      </section>
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center flex-wrap gap-2 py-2 border-b border-foreground">
          <h2 className="text-xl">Tickets</h2>
          <div className="flex gap-2">
            {Object.values(FILTERS).map((f) => (
              <Button className='hover:cursor-pointer' size="sm" key={f.value} onClick={() => handleFilterChange(f.value)} variant={filter === f.value ? 'default' : 'outline'}>
                {f.label}
              </Button>
            ))}
          </div>
        </div>
        <TicketList tickets={ticketsWithAssignees} isLoading={isLoading} isError={isError} />
      </section>
    </div>
  );
}

