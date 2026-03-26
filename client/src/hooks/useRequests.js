import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

export const useMyRequests = (email) => {
    return useQuery({
        queryKey: ["myRequests", email],
        queryFn: async () => {
            const res = await axiosInstance.get(ENDPOINTS.MY_REQUESTS(email));
            return res.data;
        },
        enabled: !!email
    });
};
