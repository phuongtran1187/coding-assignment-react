import { handleResponse } from "@/lib/utils";

export const getUsers = async () => {
    const response = await fetch('/api/users');
    return handleResponse(response);
};

export const getUser = async (id: string) => {
    const response = await fetch(`/api/users/${id}`);
    return handleResponse(response);
};