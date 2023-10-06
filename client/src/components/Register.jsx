import React from 'react'
import { useState } from 'react'

const Register = () => {
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
  return (
    <div className='bg-blue-50 h-screen flex items-center'>
        <form className='w-64 mx-auto mb-12'>
            <input value={username} onChange={event=>setUsername(event.target.value)} type='text' placeholder='Username' className='block w-full rounded-sm p-2 mb-2 border'/>
            <input value={password} onChange={event=>setPassword(event.target.value)} type='password' placeholder='Password' className='block w-full rounded-sm p-2 mb-2 border '/>
            <button className='bg-blue-500 text-white block w-full rounded-sm'>Register</button>
        </form>
      
    </div>
  )
}

export default Register
