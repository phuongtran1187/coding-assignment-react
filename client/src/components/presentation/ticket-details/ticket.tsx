import { StateView, TicketInfo, TicketInfoSkeleton } from "@/components/shared";
import { TicketWithAssignee } from "@/types";
import { memo } from "react";

export interface TicketProps {
  ticket: TicketWithAssignee | null;
  isLoading?: boolean;
  isError?: boolean;
}

export const Ticket = memo(({ ticket, isLoading = false, isError = false }: TicketProps) => {
  if (isLoading) {
    return <TicketInfoSkeleton />;
  }

  if (isError) {
    return <StateView type="error" />;
  }

  if (!ticket) {
    return <StateView type="empty" />;
  }

  return (
      <TicketInfo shortTitle={false} data={ticket} type="editable" />
  );
});