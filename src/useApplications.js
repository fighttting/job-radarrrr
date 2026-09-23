import { useQuery } from "@tanstack/react-query";
import getApplications from "./api/getApplications";

export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: getApplications,
    staleTime: 30000,
  });
}
