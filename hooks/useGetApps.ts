import { useQuery } from "@tanstack/react-query";

import { getAppsForTestimonialCreation } from "@/actions/app";

export const useGetApps = () => {
    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ["get-apps"],
        queryFn: async () => {
            const data = await getAppsForTestimonialCreation();
            return data;
        }
    });

    return { data, isLoading };
};