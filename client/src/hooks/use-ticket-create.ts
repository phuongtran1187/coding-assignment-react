import { createTicket } from "@/services/mutate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useTicketCreate = () => {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: (description: string) => createTicket(description),
    });

    const mutateCreate= useCallback((description: string) => {
        mutate(description, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['tickets'] });
            },
        });
    }, [mutate]);

    return { mutateCreate, isLoading: isPending };
};