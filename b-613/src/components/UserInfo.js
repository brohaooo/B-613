
import './UserInfo.css';
import { Form, Input, Button, Checkbox , Avatar, Card, Image} from 'antd';
import {  UserOutlined, LockOutlined, SmileOutlined,HeartOutlined, CommentOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';


//self defined component that displays the detailed information of the user
function UserInfo() {
  // load the user information from the cookie
  const userName = cookie.load('userName');
  const userEmail = cookie.load('userEmail');
  const age = cookie.load('age');
  const gender = cookie.load('gender');
  const city = cookie.load('city');
  const picture = cookie.load('picture');
  const userid = cookie.load('id');
//navigate to the edit page
  const goToEdit = () => {
    window.location.href="/edit";
  }
  //log out of current account and clear all the data stored in the cookie
  const goToLogOut = () => {
    cookie.remove('id');
      cookie.remove('userName'); 
      cookie.remove('userEmail'); 
      cookie.remove('age'); 
      cookie.remove('password'); 
      cookie.remove('gender'); 
      cookie.remove('city');
      cookie.remove('picture');
    window.location.href="/";
  }
  return (
    <div className="u-info">
      {/* avatar of the user */}
      <Avatar className='u-info-avatar' size={64} src={picture!=='default.png'?require(`../../../back-end/upload/${picture}`):require(`../picture/ufo.png`)}  />
      {/* detailed user information */}
      <div className='user-information'>
        <div className='userName'>UserName: {userName}</div>
        <div className='userName'>UserID: {userid}</div>
        <div className='userEmail'>UserEmail: {userEmail}</div>
        <div className='age'>Age: {age}</div>
        <div className='city'>City: {city}</div>
      </div>
      <Button className='userInfoBtn' type="primary" shape="round" onClick={goToEdit}>Edit</Button>
      <Button className='userInfoBtn-1' type="primary" shape="round" onClick={goToLogOut}>Logout</Button>
    </div>
      
  );
}

export default UserInfo;
