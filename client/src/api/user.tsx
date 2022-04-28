import { User } from "../Interfaces";

export const register = async ({ username, password }: User) => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const message = await res.json();
  return message;
};

export const login = async ({ username, password }: User) => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const message = await res.json();
  return message;
};

export const logout = async ({ username, password }: User) => {
  await fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  localStorage.clear();
  window.location.reload();
};

export const getUser = async (nothing: string) => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/account`, {
    credentials: "include",
  });
  const user = await res.json();
  return user;
};
