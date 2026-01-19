import { useTicket, useUsers } from "@/hooks";
import { useParams } from "react-router-dom";
import { User } from "@acme/shared-models";
import { Ticket } from "@/components/presentation";
import { useMemo } from "react";

export const TicketDetails = () => {
  const { id } = useParams();

  const { ticket, isLoading, isError } = useTicket(Number(id));
  const { users } = useUsers();

  const ticketDisplay = useMemo(() => {
    if (!ticket) {
      return null;
    }
    return {
      ...ticket,
      assignee: users.find((u: User) => u.id === ticket?.assigneeId) ?? null, 
    };
  }, [ticket, users]);

  return (
    <section className="flex flex-col max-w-md mx-auto border border-border rounded-lg [&>div]:p-4">
      <div className="flex justify-center items-center border-b border-border bg-amber-50 rounded-t-lg">
        <h1 className="text-xl">Ticket #{id}</h1>
      </div>
      <div>
        <Ticket ticket={ticketDisplay} isLoading={isLoading} isError={isError} />
      </div>
    </section>
  );
};