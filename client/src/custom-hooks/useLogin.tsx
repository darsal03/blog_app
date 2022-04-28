import { useMutation } from "react-query";
import { login } from "../api/user";

export function useLogin() {
  return useMutation({ mutationFn: login });
}
