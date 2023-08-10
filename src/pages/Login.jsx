import styled, { css } from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import ButtonGroup from "../ui/ButtonGroup";
import Button from "../ui/Button";
import { useState } from "react";
import SignupForm from "../features/authentication/SignupForm";



const sizes = {
  small: css`
    grid-template-columns: 44rem;
  `,
  large: css`
    grid-template-columns: 64rem;
  `,
};

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  ${(props) => sizes[props.$size]}
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;


function Login() {
  const [isLogin, setIsLogin] = useState(true)

  return <LoginLayout $size={isLogin ? 'small' : 'large'}>
    <Logo />
    <Heading as='h4'>Login to your account</Heading>

    {isLogin
      ? <LoginForm onSignup={setIsLogin}  />
      : <SignupForm isStaff={false} onCancel={setIsLogin} />
    }
      </LoginLayout>;
}

export default Login;
