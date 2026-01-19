import { handleResponse } from "@/lib/utils";

export const getTickets = async () => {
    const response = await fetch('/api/tickets');
    return handleResponse(response);
};

export const getTicket = async (id: number) => {
    const response = await fetch(`/api/tickets/${id}`);
    return handleResponse(response);
};