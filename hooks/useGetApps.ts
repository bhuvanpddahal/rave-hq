import { getApps } from "@/actions/app";
import { useQuery } from "@tanstack/react-query";

export const useGetApps = () => {
    const {
        data,
        isLoading
    } = useQuery({
        queryKey: ["get-apps"],
        queryFn: async () => {
            const data = await getApps();
            return data;
        }
    });

    return { data, isLoading };
};