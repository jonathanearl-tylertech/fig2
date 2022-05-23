import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

export default function Register() {
  const passwordRef = useRef<HTMLInputElement>();
  const confirmationRef = useRef<HTMLInputElement>();
  const [passwordMatch, setPasswordMatch] = useState(false);

  const validatePasswordMatch = () => {
    const password = passwordRef.current?.value;
    const confirmation = confirmationRef.current?.value;
    console.log(password, confirmation, password === confirmation)
    setPasswordMatch(password === confirmation);
  }

  return (<>
    <Container>
      <Form action='/api/v1/registration' method='POST'>
          <Logo>
            🌰<Image src='/logo.png' width="100" height="90"/>
          </Logo>
          <h1>Sign up</h1>
          <EmailField name='email' label='Email' variant='outlined' size='small' required/>
          <UsernameField name='username' label='Username' variant='outlined' size='small' required/>
          <PasswordField name='password' inputRef={passwordRef} label='Password' type='password' variant='outlined' size="small" 
              required onBlur={validatePasswordMatch}/>
          <ConfirmationField inputRef={confirmationRef} label='Confirm Password' type='password' variant='outlined' size="small"
              required onBlur={validatePasswordMatch} error={!passwordMatch}/>
          <SubmitButton type='submit' color='primary' variant='contained'>register</SubmitButton>
          <HelperText>Back to <a href='/login'>Login</a></HelperText>
      </Form>
    </Container>
  </>);
}

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Form = styled.form`
  align-items: stretch;
  width: 350px;
  padding: 36px 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Logo = styled.span`
  display: flex;
  align-items: center;
  font-size: 64px;
  margin: 0 auto 2rem auto;
`;

const EmailField = styled(TextField)`
  margin-bottom: 1rem;
`;

const UsernameField = styled(TextField)`
  margin-bottom: 1rem;
`;

const PasswordField = styled(TextField)`
  margin-bottom: .5rem;
`;

const ConfirmationField = styled(TextField)`
  margin-bottom: 1rem;
`;

const SubmitButton = styled(Button)`
  margin-bottom: 1em;
`;

const HelperText = styled.span`
`;