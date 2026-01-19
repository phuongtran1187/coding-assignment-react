import { completeTicket, incompleteTicket } from "@/services/mutate/ticket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useTicketStatus = () => {
    const queryClient = useQueryClient();
   
    const invalidateTicketQueries = useCallback((id: number) => {
        queryClient.invalidateQueries({ queryKey: ['tickets'] });
        queryClient.invalidateQueries({ queryKey: ['ticket', id], exact: true });
    }, [queryClient]);

    const mutateComplete = useMutation({
        mutationFn: (id: number) => completeTicket(id.toString()),
    });

    const mutateIncomplete = useMutation({
        mutationFn: (id: number) => incompleteTicket(id.toString()),
    });

    const mutate = useCallback(({ id, complete, onSuccess, onError }: { id: number, complete: boolean, onSuccess?: () => void, onError?: () => void }) => {
        if (complete) {
            mutateComplete.mutate(id, {
                onSuccess: () => {
                    invalidateTicketQueries(id);
                    onSuccess?.();
                },
                onError: () => {
                    onError?.();
                },
            });
        } else {
            mutateIncomplete.mutate(id, {
                onSuccess: () => {
                    invalidateTicketQueries(id);
                    onSuccess?.();
                },
                onError: () => {
                    onError?.();
                },
            });
        }
    }, [mutateComplete, mutateIncomplete, invalidateTicketQueries]);

    return {
        mutate,
        isLoading: mutateComplete.isPending || mutateIncomplete.isPending,
    };
};