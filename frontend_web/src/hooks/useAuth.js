import { getUser } from "../services/authUtils";

export function useAuth() {
  const user = getUser();

  return {
    user,
    isAuthenticated: !!user,
    role: user?.role,
  };
}