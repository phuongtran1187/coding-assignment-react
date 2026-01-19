import { getUsers } from "@/services/query/user";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
    const { data: users = [], isLoading, isFetching } = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    return { users, isLoading, isFetching };
};