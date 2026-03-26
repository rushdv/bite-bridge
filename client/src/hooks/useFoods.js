import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoints";

export const useFeaturedFoods = () => {
    return useQuery({
        queryKey: ["featuredFoods"],
        queryFn: async () => {
            const res = await axiosInstance.get(ENDPOINTS.FEATURED_FOODS);
            return res.data;
        }
    });
};

export const useMyFoods = (email) => {
    return useQuery({
        queryKey: ["myFoods", email],
        queryFn: async () => {
            const res = await axiosInstance.get(ENDPOINTS.MY_FOODS(email));
            return res.data;
        },
        enabled: !!email
    });
};
