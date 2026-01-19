import { assignTicket } from "@/services/mutate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useTicketAssign = () => {
    const queryClient = useQueryClient();
    
    const invalidateTicketQueries = useCallback((id: number) => {
        queryClient.invalidateQueries({ queryKey: ['tickets'] });
        queryClient.invalidateQueries({ queryKey: ['ticket', id], exact: true });
    }, [queryClient]);

    const { mutate: mutateAssign, isPending: changingAssignee } = useMutation({
        mutationFn: ({ id, assigneeId }: { id: number, assigneeId: number }) => {
            return assignTicket(id.toString(), assigneeId.toString());
        },
    });

    const mutate = useCallback(({ id, assigneeId, onSuccess, onError }: { id: number, assigneeId: number, onSuccess?: () => void, onError?: () => void }) => {
        mutateAssign({ id, assigneeId: assigneeId ?? null }, {
            onSuccess: () => {
                invalidateTicketQueries(id);
                onSuccess?.();
            },
            onError: () => {
                onError?.();
            },
        });
    }, [mutateAssign, invalidateTicketQueries]);

    return {
        mutate,
        isLoading: changingAssignee,
    };
};