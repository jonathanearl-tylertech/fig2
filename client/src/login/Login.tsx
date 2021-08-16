import React from 'react';
import Modal from 'react-modal';
import { TextField, Button } from '@material-ui/core';
import fig from '../../assets/images/fig.png';
import HorizontalLine from './components/HorizontalLine';
import OrSpacer from './components/OrSpacer';

Modal.setAppElement('#root');

if (Modal?.defaultStyles?.overlay)
  Modal.defaultStyles.overlay.backgroundColor = "rgba(0,0,0,.65)"

export const Login = () => {
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalStyle}
      contentLabel="Login"
    >
      <form className='flex flex-col py-8 px-12'>
        <img className='mx-auto mb-4 h-10 w-12' src={fig} />
        <div className='flex flex-col mb-2'>
          <TextField id='email' label='Email' variant='outlined' size='small' />
        </div>
        <div className='flex flex-col mb-4'>
          <TextField id='password' label='Password' type='password' variant='outlined' size="small" />
        </div>
        <div className='flex flex-col'>
          <Button color='primary' variant='contained' disabled={false} >log in</Button>
        </div>
        <OrSpacer></OrSpacer>
        <div className="flex justify-center text-xs">Forgot password?</div>
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