import { useMutation } from "react-query";
import { getUser } from "../api/user";

export function useGetUser() {
  return useMutation({ mutationFn: getUser });
}
