import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRegister } from "../../custom-hooks/useRegister";

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

const ErrorMessage = styled.p`
  text-align: center;
  margin: 0.2rem;
  // font-weight: 700;
  color: #d8000c;
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

export function Register({ redirectToLogin }: { redirectToLogin: () => void }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const { mutate: register } = useRegister();

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
      //redirect to home page
    }
  };

  const handleSumbit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUsernameError("");
    setPasswordError("");
    if (user.username.length < 5) {
      setUsernameError("username must be more than 4 characters");
    }
    if (user.password.length < 5) {
      setPasswordError("password must be more than 5 characters");
    }
    if (user.username.length > 5 && user.password.length > 5) {
      register(user, {
        onSuccess: (response) => handleOnSuccess(response),
      });
    }
  };

  return (
    <Box>
      <H1>
        Register<Slash>|</Slash>
      </H1>
      <Form onSubmit={handleSumbit} autoComplete="off">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={user.username}
          onChange={handleInputChange}
        />
        <ErrorMessage> {usernameError ? usernameError : ""}</ErrorMessage>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
        />
        <ErrorMessage>{passwordError ? passwordError : ""}</ErrorMessage>
        <Button type="submit">Submit</Button>
        <ErrorMessage> {serverError ? serverError : ""}</ErrorMessage>
      </Form>
      <LinkMessage>
        Already have an account?
        <span onClick={redirectToLogin}>Login</span>
      </LinkMessage>
    </Box>
  );
}
