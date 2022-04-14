
import './LoginPage.css';
import { Form, Input, Button, Checkbox } from 'antd';
import {  UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';

function CreateMoment() {
  const goToLogin = () => {
    window.location.href="/";
  };
  const goToRegister = () => {
    window.location.href="/register";
  };
  const goToHome = () => {
    window.location.href="/home";
  };
  const Login = () => {
    axios.post('http://localhost:8080/api/login/', {
      userEmail: mail,
      password: password,
    })
    .then(function (response) {
      console.log(response);
      goToHome();
    })
    .catch(function (error) {
      console.log(error);
    });
    setMail('');
    setPassword('');
  }; 
  const [password,setPassword] = useState('');
  const [mail,setMail] = useState('');

  return (
    <div className="page">
      
    </div>
  );
}

export default CreateMoment;
