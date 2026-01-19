import { getTicket } from "@/services/query/ticket";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useTicket = (id: number) => {
    const { data: ticket = null, isLoading, isFetching, isError } = useQuery({
        queryKey: ['ticket', id],
        queryFn: () => getTicket(id),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        placeholderData: keepPreviousData,
        enabled: !!id,
    });

    return { ticket, isLoading, isFetching, isError };
};