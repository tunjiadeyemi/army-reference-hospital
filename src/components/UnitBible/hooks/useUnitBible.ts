import { useQuery } from "@tanstack/react-query"
import { getOfficerById, getOfficers } from "../../../services/dashboardApi/dashboardServices"


export const useGetOfficers = () => {
    return useQuery({
        queryKey: ["getOfficers"],
        queryFn: getOfficers
    })
}
export const useGetOfficersById = (id: string | number) => {
    return useQuery({
        queryKey: ["officersById"],
        queryFn: () =>  getOfficerById(id)
    })
}