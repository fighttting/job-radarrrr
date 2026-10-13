import { useMutation, useQueryClient } from "@tanstack/react-query";
import { load, save } from "./storage";
import { today } from "./dates";

// Every write goes through here: read storage, change it, save, update the cache
function useApplicationsMutation(change) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      const data = change(load(), input);
      save(data);
      return data.applications;
    },
    onSuccess: (applications) => {
      queryClient.setQueryData(["applications"], applications);
    },
  });
}

export const useAddApplication = () =>
  useApplicationsMutation((data, application) => ({
    ...data,
    applications: [...data.applications, application],
  }));

export const useChangeStatus = () =>
  useApplicationsMutation((data, { id, status }) => ({
    ...data,
    applications: data.applications.map((app) =>
      app.id === id
        ? { ...app, events: [...app.events, { status, date: today() }] }
        : app,
    ),
  }));

export const useDeleteApplication = () =>
  useApplicationsMutation((data, id) => ({
    ...data,
    applications: data.applications.filter((app) => app.id !== id),
  }));

// Import and sample data: replace everything with an already-validated export
export const useReplaceData = () =>
  useApplicationsMutation((_data, replacement) => replacement);
