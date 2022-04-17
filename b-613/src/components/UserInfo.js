
import './UserInfo.css';
import { Form, Input, Button, Checkbox , Avatar, Card, Image} from 'antd';
import {  UserOutlined, LockOutlined, SmileOutlined,HeartOutlined, CommentOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

function UserInfo() {
  const userName = cookie.load('userName');
  const userEmail = cookie.load('userEmail');
  const age = cookie.load('age');
  const gender = cookie.load('gender');
  const city = cookie.load('city');
  const picture = cookie.load('picture');

  return (
    <div className="u-info">
      <Avatar className='u-info-avatar' size={64} icon={<UserOutlined />}  />
      <div className='user-information'>
        <div className='userName'>UserName: {userName}</div>
        <div className='userEmail'>UserEmail: {userEmail}</div>
        <div className='age'>Age: {age}</div>
        <div className='city'>City: {city}</div>
      </div>
      
    </div>
      
  );
}

export default UserInfo;
