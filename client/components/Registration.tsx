import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import fig from '../assets/images/fig.png';
import registrationService from '../services/registration.service';
import IRegistrationState from '../interfaces/registration-state.interface';
import CreateUserDto from '../dtos/create-user.dto';

function Registration() {
  const [state, setState] = useState<IRegistrationState>({
    fields: { email: '', username: '', password: '', passwordVerification: '' },
    errors: { email: '', username: '', password: '', passwordVerification: '' },
    isFormEnabled: false,
    passwordHelperText: 'at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username.',
  });

  const register = function() {
    const user: CreateUserDto = { ...state.fields };
    registrationService.registerUser(user)
  }

  const handleChange = async function(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>){
    const field = e.currentTarget.id as string;
    const fieldValue = e.currentTarget.value.trim() as string;
    let fieldError: string;
    try {
      fieldError = await validate(field, fieldValue);
    } catch (err) {
      fieldError = 'somethings went wrong, please try again later...';
      console.error(err);
    }

    const newState: IRegistrationState = { 
      ...state,
      fields: {
        ...state.fields,
        [field]: fieldValue,
      },
      errors: {
        ...state.errors,
        [field]: fieldError,
      },
      isFormEnabled: true,
    };

    Object.values(newState.errors).forEach(val => { if(val) newState.isFormEnabled = false });
    setState(newState);
  }

  const validate = async function(field: string, fieldValue: string) {
    if (fieldValue === '')  {
      return 'is required';
    }

    switch (field) {
      case 'email': {
        return await registrationService.validateEmail(fieldValue);     
      }
      case 'username': {
        return await registrationService.validateUsername(fieldValue);     
      }
      case 'password': {
        return registrationService.validatePassword(fieldValue);
      }
      case 'passwordVerification': {
        return state.fields.password === fieldValue ? '' : 'passwords must match';
      }
    }

    return '';
  }

  return (
    <form className='flex flex-col py-8 px-12 m-auto' style={{ width: '415px', padding: '0 40', border: '1px solid rgb(219, 219, 219)' }}>
      <img className='mx-auto mb-4 h-10 w-12' src={fig} alt="fig logo"/>
      <div className='flex flex-col mb-4'>
        <TextField id='email' label='Email' error={!!state.errors.email} required variant='outlined' size='small' onBlur={handleChange} helperText={state.errors.email}/>
      </div>
      <div className='flex flex-col mb-4'>
        <TextField id='username' label='Username' error={!!state.errors.username} required variant='outlined' size='small' onBlur={handleChange} helperText={state.errors.username}/>
      </div>
      <div className='flex flex-col mb-2'>
        <TextField id='password' label='Password' error={!!state.errors.password} required type='password' variant='outlined' size="small" onBlur={handleChange} helperText={state.errors.password ? state.errors.password : state.passwordHelperText}/>
      </div>
      <div className='flex flex-col mb-4'>
        <TextField id='passwordVerification' error={!!state.errors.passwordVerification} label='Password verification' required type='password' variant='outlined' size="small" onBlur={handleChange} helperText={state.errors.passwordVerification}/>
      </div>
      <div className='flex flex-col mb-8'>
        <Button color='primary' variant='contained' disabled={!state.isFormEnabled} onClick={register}>Register</Button>
      </div>
    </form>
  );
}

export default Registration;