import { useState } from "react";
import styled from "styled-components";
import { useGetUser } from "../../custom-hooks/useGetUser";
import { useLogout } from "../../custom-hooks/useLogout";
import { Header } from "../representational/authApp/Header";
import { Login } from "../representational/Login";
import { Register } from "../representational/Register";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function UnAuthApp({ onSetAuth }: { onSetAuth: () => void }) {
  const [loginView, setLoginView] = useState(false);

  const redirectToLogin = () => {
    setLoginView(true);
  };
  const redirectToRegister = () => {
    setLoginView(false);
  };

  return (
    <Container>
      {loginView ? (
        <Login redirectToRegister={redirectToRegister} onSetAuth={onSetAuth} />
      ) : (
        <Register redirectToLogin={redirectToLogin} />
      )}
    </Container>
  );
}

function AuthApp() {
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    const user: any = localStorage.getItem("user");
    logout(JSON.parse(user));
  };

  return (
    <>
      <Header onLogout={handleLogout} />
    </>
  );
}

export function Content() {
  const { mutate: getUser } = useGetUser();

  const handleSetLocalStorage = () => {
    getUser("", {
      onSuccess: (data) => localStorage.setItem("user", JSON.stringify(data)),
    });
  };

  return (
    <>
      {!localStorage.getItem("user") && (
        <UnAuthApp onSetAuth={handleSetLocalStorage} />
      )}
      {localStorage.getItem("user") && <AuthApp />}
    </>
  );
}
