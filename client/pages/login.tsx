import { Button, TextField } from '@mui/material';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { getUidFromCookie } from '../services/cookie.service';

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const uid = getUidFromCookie(context.req, context.res);
    return { 
      redirect: {
        destination: '/profile',
        permanent: false,
      }
    };
  } catch (err) {
    console.error(err);
    return { props: {} };
  }
}

export default function Login() {
  return (<>
    <Container>
      <Form action='/api/v1/login' method='POST'>
          <Logo>
            🌰<Image src='/logo.png' width="100" height="90"/>
          </Logo>
          <h1>Login</h1>
          <EmailField name='email' label='Email' variant='outlined' size='small'/>
          <PasswordField name='password' label='Password' type='password' variant='outlined' size="small" />
          <SubmitButton type='submit' color='primary' variant='contained'>log in</SubmitButton>
          <HelperText>Don't have an account? <a href='/register'>Sign Up</a></HelperText>
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
  flex-direction: column;
`;

const Logo = styled.span`
  display: flex;
  align-items: center;
  font-size: 64px;
  margin: 0 auto 2rem auto;
`;

const EmailField = styled(TextField)`
  margin-bottom: .5em;
`;

const PasswordField = styled(TextField)`
  margin-bottom: 1rem;
`;

const SubmitButton = styled(Button)`
  margin-bottom: 1em;
`;

const HelperText = styled.span`
`;