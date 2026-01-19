import { handleResponse } from "@/lib/utils";

export const createTicket = async (description: string) => {
    const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
    });
    return handleResponse(response);
};

export const assignTicket = async (id: string, userId: string) => {
    const response = await fetch(`/api/tickets/${id}/assign/${userId}`, {
        method: 'PUT',
    });
    return handleResponse(response);
};

export const unassignTicket = async (id: string) => {
    const response = await fetch(`/api/tickets/${id}/unassign`, {
        method: 'PUT',
    });
    return handleResponse(response);
};

export const completeTicket = async (id: string) => {
    const response = await fetch(`/api/tickets/${id}/complete`, {
        method: 'PUT',
    });
    return handleResponse(response);
};

export const incompleteTicket = async (id: string) => {
    const response = await fetch(`/api/tickets/${id}/complete`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};