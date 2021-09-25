import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { TextField, Button } from '@material-ui/core';
import fig from '../assets/images/fig.png';
import HorizontalLine from './HorizontalLine';
import { AuthHelper } from '../services/auth-helper';
import { closeLogin, openLogin } from '../feature/loginSlice';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { endUserSession, SessionState, startUserSession } from '../feature/sessionslice';
import profileService from '../services/profile.service';

Modal.setAppElement('#root');

if (Modal?.defaultStyles?.overlay)
  Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,.65)"

export const Login = () => {
  const dispatch = useDispatch()
  const hasSession: SessionState = useSelector((state: RootStateOrAny) => state.session.hasSession);
  const isLoginOpen = useSelector((state: RootStateOrAny) => state.login.isOpen);
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [isFormValid, setIsFormValid] = useState(false);
  const [loginError, setLoginError] = useState('');



  useEffect(() => {
    const checkSession = async (hasSession: SessionState) => {
      if (hasSession === SessionState.isActive) {
        dispatch(closeLogin());
        return;
      } 
  
      if (hasSession === SessionState.isInactive) {
        dispatch(openLogin());
        return;
      }
    }

    checkSession(hasSession);
  },[dispatch, hasSession])

  async function login() {
    try {
      await AuthHelper.login(credentials.email, credentials.password);
      await fetchProfile();
      dispatch(closeLogin());
      setCredentials({email: '', password: ''});
      setIsFormValid(false);
      setLoginError('');
    } catch (err) {
      setLoginError('Could not validate credentials, please try again later');
      console.warn(err);
    }
  }

  const fetchProfile = async () => {
    if (hasSession === SessionState.uninitialized) {
      const token = await AuthHelper.getToken();
      if (!token) {
        dispatch(endUserSession());
        return;
      }
      await fetchProfile();
    }
    const userinfo = await profileService.getMe();
    dispatch(startUserSession(userinfo));
  }

  function handler(id: string, value: string) {
    const updateCredentials = { ...credentials };
    switch(id) {
      case 'email': {
        updateCredentials.email = value;
        break;
      }
      case 'password': {
        updateCredentials.password = value;
        break;
      }
    }
    setCredentials(updateCredentials);
    setIsFormValid(updateCredentials.email !== '' && updateCredentials.password !== '');
  }

  return (
    <Modal
      isOpen={isLoginOpen}
      style={modalStyle}
      contentLabel="Login"
    >
      <form className='flex flex-col py-8 px-12'>
        <img className='mx-auto mb-4 h-10 w-12' src={fig} alt="fig logo"/>
        { loginError && <div className="flex justify-center text-sm py-4">Don't have an account? Sign Up</div> }
        <div className='flex flex-col mb-2'>
          <TextField id='email' label='Email' variant='outlined' size='small' onChange={(e) => handler(e.target.id, e.target.value)}/>
        </div>
        <div className='flex flex-col mb-4'>
          <TextField id='password' label='Password' type='password' variant='outlined' size="small" onChange={(e) => handler(e.target.id, e.target.value)} />
        </div>
        <div className='flex flex-col'>
          <Button color='primary' variant='contained' disabled={!isFormValid} onClick={login}>log in</Button>
        </div>
      </form>
      <HorizontalLine></HorizontalLine>
      <div className="flex justify-center text-sm py-4">Don't have an account? Sign Up</div>
      <HorizontalLine></HorizontalLine>
    </Modal>
  );
}

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};