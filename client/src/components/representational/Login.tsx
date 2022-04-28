import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useLogin } from "../../custom-hooks/useLogin";
const Box = styled.div`
  margin: 10rem 0 1rem 0;
  padding: 3rem;
  border-radius: 0.3rem;
  background-color: #d3d3d3;
`;

const slash = keyframes`
0%{
  opacity:0;
}
50%{
  opacity:0;
}
70%{
  opacity:1;
}
100%{
  display:0;
}
`;
const Slash = styled.span`
  animation: ${slash} 0.7s linear infinite;
  font-weight: 200;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 40rem;

  input {
    margin: 1rem 4rem;
    padding: 0.2rem;
  }
`;

const Button = styled.button`
  margin: 1rem 10rem;
  padding: 0.3rem;
  border: none;
  cursor: pointer;
  transition: 0.25s ease-in-out;
  &:hover {
    filter: brightness(110%);
  }
`;

const H1 = styled.h1`
  font-weight: 200;
  text-align: center;
`;

const LinkMessage = styled.p`
  margin: 1.5rem 0rem 0rem;

  span {
    cursor: pointer;
    color: #008000;
  }
  span:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  text-align: center;
  margin: 0.2rem;
  // font-weight: 700;
  color: #d8000c;
`;

export function Login({
  redirectToRegister,
  onSetAuth,
}: {
  redirectToRegister: () => void;
  onSetAuth: () => void;
}) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [serverError, setServerError] = useState("");

  const { mutate: login } = useLogin();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleOnSuccess = (response: any) => {
    if (response && response.msg) {
      setServerError(response.msg);
      return;
    } else {
      onSetAuth();
    }
  };

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user.username.length === 0) {
      setUsernameError("username field is empty");
    }
    if (user.password.length === 0) {
      setPasswordError("password field is empty");
    }

    login(user, {
      onSuccess: (response) => handleOnSuccess(response),
    });
  };

  return (
    <>
      <Box>
        <H1>
          Login<Slash>|</Slash>
        </H1>
        <Form onSubmit={handleSumbit} autoComplete="off">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleInputChange}
          />
          <ErrorMessage> {usernameError ? usernameError : ""}</ErrorMessage>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
          />
          <ErrorMessage>{passwordError ? passwordError : ""}</ErrorMessage>
          <Button type="submit">Login</Button>
          <ErrorMessage>{serverError ? serverError : ""}</ErrorMessage>
        </Form>
        <LinkMessage>
          Don't have an account?
          <span onClick={redirectToRegister}>Register</span>
        </LinkMessage>
      </Box>
    </>
  );
}
