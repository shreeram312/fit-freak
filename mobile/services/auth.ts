import { useQuery, useMutation } from "@tanstack/react-query";
import { useApiClient } from "@/lib/api";
import { User } from "@/types/user";

export const useCurrentUser = () => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const api = await apiClient;
      const res = await api.get<User>("/auth/me");
      return res.data;
    },
  });
};

export const useSignUpAuth = () => {
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: async (data: {
      email: string;
      clerkId: string;
      name: string;
    }) => {
      const api = await apiClient;
      const res = await api.post<User>("/api/auth/sign-up", data);
      return res.data;
    },
  });
};
