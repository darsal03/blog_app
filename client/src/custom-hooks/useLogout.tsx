import { useMutation } from "react-query";
import { logout } from "../api/user";

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}
