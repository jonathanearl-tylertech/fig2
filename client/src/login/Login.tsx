import React from 'react';
import Modal from 'react-modal';
import { TextField, Button } from '@material-ui/core';
import fig from '../assets/images/fig.png';
import HorizontalLine from './components/HorizontalLine';
import { AuthHelper } from '../services/auth-helper';

Modal.setAppElement('#root');

if (Modal?.defaultStyles?.overlay)
  Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,.65)"

export const Login = () => {
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const [credentials, setCredentials] = React.useState({ email: '', password: '' })
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [loginError, setLoginError] = React.useState('');

  async function login() {
    try {
      await AuthHelper.login(credentials.email, credentials.password);
      setCredentials({email: '', password: ''});
      setIsFormValid(false);
      setIsOpen(false);
      setLoginError('');
    } catch (err) {
      setLoginError('Could not validate credentials, please try again later');
      console.warn(err);
    }
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
      isOpen={modalIsOpen}
      style={modalStyle}
      contentLabel="Login"
    >
      <form className='flex flex-col py-8 px-12'>
        <img className='mx-auto mb-4 h-10 w-12' src={fig} />
        { loginError && <div className="flex justify-center text-sm py-4">Don't have an account? Sign Up</div> }
        <div className='flex flex-col mb-2'>
          <TextField id='email' label='Email' variant='outlined' size='small' onBlur={(e) => handler(e.target.id, e.target.value)}/>
        </div>
        <div className='flex flex-col mb-4'>
          <TextField id='password' label='Password' type='password' variant='outlined' size="small" onBlur={(e) => handler(e.target.id, e.target.value)} />
        </div>
        <div className='flex flex-col'>
          <Button color='primary' variant='contained' disabled={!isFormValid} onClick={login}>log in</Button>
        </div>
      </form>
      <HorizontalLine></HorizontalLine>
      <div className="flex justify-center text-sm py-4">Don't have an account? Sign Up</div>
      <HorizontalLine></HorizontalLine>
    </Modal>
  )
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