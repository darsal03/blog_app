import { useMutation } from "react-query";
import { register } from "../api/user";

export function useRegister() {
  return useMutation({ mutationFn: register });
}
