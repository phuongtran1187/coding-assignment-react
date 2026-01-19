import { Ticket, User } from "@acme/shared-models";

export type TicketWithAssignee = Ticket & { assignee?: User };