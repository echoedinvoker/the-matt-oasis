import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  // const { isLoading, isAuthenticated } = useUser()
  // const navigate = useNavigate()

  // useEffect(() => {
  //   console.log(isAuthenticated)
  //   if (isAuthenticated && !isLoading) {
  //     navigate("/dashboard")
  //   }
  // }, [isAuthenticated, isLoading, navigate])

  return <LoginLayout>
    <Logo />
    <Heading as='h4'>Login to your account</Heading>
    <LoginForm /> 
  </LoginLayout>;
}

export default Login;
