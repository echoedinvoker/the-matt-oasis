import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import styled from "styled-components"

const SwitchButton = styled(Button)`
  letter-spacing: 2px;
  text-transform: uppercase;
`

function LoginForm({ onSignup }) {
  const [email, setEmail] = useState("johnsmith@test.eu");
  const [password, setPassword] = useState("qwer1234");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin()

  function handleToggleFakeAccounts() {
    if (email === 'johnsmith@test.eu') {
      setEmail('ragehiy649@viperace.com')
    }
    else {
      setEmail('johnsmith@test.eu')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) return
    login({ email, password }, {
      onSettled: () => {
        setEmail('')
        setPassword('')
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <SwitchButton type='button' $size='small' $variation='danger' onClick={handleToggleFakeAccounts}>
        {email === 'johnsmith@test.eu'
          ? 'switch to staff account'
          : 'switch to guest account'
        }
      </SwitchButton>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading} style={{
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
        <Button
          type="button"
          size="large"
          onClick={() => onSignup(false)}
          disabled={isLoading}
          style={{
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          {!isLoading ? "Sign up" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
