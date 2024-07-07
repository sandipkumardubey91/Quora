import React from 'react'
import './QuoraBox.css'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';  

const QuoraBox = () => {
  const user = useSelector(selectUser);
  return (
    <div className='quorabox'>
        <div className='quoraBox_info'>
            <Avatar
              src={user.photoURL}
            />
            <h5>{user.displayName}</h5>
        </div>
        <div className='quoraBox_quora'>
            <p>
                What do you want ask or share?
            </p>
        </div>
    </div>
  )
}

export default QuoraBox