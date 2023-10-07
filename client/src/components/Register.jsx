import React, { useState } from 'react';
import instance from '../Axios/axios';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../Redux/userSlice';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const clearError = () => {
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = isLoginOrRegister === 'register' ? '/user/register' : '/user/login';
    instance
      .post(url, { username, password },{ withCredentials: true })
      .then((response) => {
        const { data } = response;
        const user = data?.newUser;
        dispatch(setUser(user));
        dispatch(setToken(data?.token));
      })
      .catch((err) => {
        const { response } = err;
        setError(response?.data?.error);
      });
  };

  return (
    <div className='bg-blue-50 h-screen flex items-center'>
      <form className='w-64 mx-auto mb-12' onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
            clearError(); // Clear error when user starts typing
          }}
          type='text'
          placeholder='Username'
          className='block w-full rounded-sm p-2 mb-2 border'
        />
        <input
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            clearError(); // Clear error when user starts typing
          }}
          type='password'
          placeholder='Password'
          className='block w-full rounded-sm p-2 mb-2 border'
        />
        <button className='bg-blue-500 text-white block w-full rounded-sm'>
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        <div className='text-center mt-2'>
          {isLoginOrRegister === 'register' && (
            <div>
              Already a member?{' '}
              <button onClick={() => setIsLoginOrRegister('login')}>Login here</button>
            </div>
          )}
          {isLoginOrRegister === 'login' && (
            <div>
              Dont have an account? Register{' '}
              <button onClick={() => setIsLoginOrRegister('register')}>here</button>
            </div>
          )}
        </div>
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4' role='alert'>
            <strong className='font-bold'>Error:</strong>
            <span className='block sm:inline ml-2'>{error}</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
