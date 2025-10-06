import { useQuery } from "@tanstack/react-query"
import { getOverview } from "../../../services/dashboardApi/dashboardServices"

export const useGetOverview = () => {
    return useQuery( {
        queryKey: ["getOverview"],
        queryFn: getOverview
    })

}