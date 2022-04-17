import './LoginPage.css';
import { Form, Input, Button, Checkbox } from 'antd';
import {  UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';

function AdminLoginPage() {
  const goToAdmin = () => {
    window.location.href="/admin";
  };
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
    axios.post('http://localhost:8080/api/adminlogin/', {
      userName: mail,
      password: password,
    })
    .then(function (response) {
      console.log(response);
      goToAdmin();
    })
    .catch(function (error) {
      console.log(error);
      alert("Invalid username or password!")
    });
    setMail('');
    setPassword('');
  }; 
  const [password,setPassword] = useState('');
  const [mail,setMail] = useState('');

  return (
    <div className="page">
      <div className="totalBox">
        <div className='right'>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
          >
            <Form.Item>
              <h>Admin Login</h>
            </Form.Item>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Admin Username" 
              className='login-input'
              size='large'
              onChange={(e) => {
                setMail(e.target.value);
                console.log(mail)
              }}/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Admin Password"
                className='password-input'
                size='large'
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(mail)
                }}
              />
            </Form.Item>


            <Form.Item className='item-register'>
              <Button type="primary" htmlType="submit" className="login-form-button"
              onClick={Login}>
                Log in
              </Button>
            </Form.Item>
          </Form>
          
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
