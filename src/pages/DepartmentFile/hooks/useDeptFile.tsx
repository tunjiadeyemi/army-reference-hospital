import { useQuery } from "@tanstack/react-query"
import { getDeptFiles } from "../../../services/dashboardApi/dashboardServices"


export const useGetDeptFiles = () => {
    return useQuery({
        queryKey: ["getDeptFiles"],
        queryFn: getDeptFiles
    })
}