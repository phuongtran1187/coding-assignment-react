import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTickets } from "@/services";
import { Ticket } from "@acme/shared-models";
import { useMemo } from "react";

export const useTickets = () => {
    const { data: tickets = [], isLoading, isFetching, isError } = useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        placeholderData: keepPreviousData,
    });

    const { completeTickets, incompleteTickets } = useMemo(() => {
        if (!tickets || tickets.length === 0) {
            return { completeTickets: [], incompleteTickets: [] };
        }

        return {
            completeTickets: tickets.filter((t: Ticket) => t.completed),
            incompleteTickets: tickets.filter((t: Ticket) => !t.completed),
        };
    }, [tickets]);

    return { tickets, completeTickets, incompleteTickets, isLoading, isFetching, isError };
};