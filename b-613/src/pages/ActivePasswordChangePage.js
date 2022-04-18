
import { Form, Input, Button, Checkbox } from 'antd';
import {  UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies'



function ActiveChange() {
  
  const goToModify = () => {
    window.location.href="/modify";
  };

  const Login = () => {
    axios.post('http://localhost:8080/api/login/', {
      userEmail: mail,
      password: password,
    })
    .then(function (response) { 
      console.log(response.data.data[0]);
      cookie.save('id',response.data.data[0].id);
      console.log(response.data.data[0].id);
      cookie.save('userName',response.data.data[0].userName); 
      cookie.save('userEmail',response.data.data[0].userEmail); 
      cookie.save('age',response.data.data[0].age); 
      cookie.save('password',response.data.data[0].password); 
      cookie.save('gender',response.data.data[0].gender); 
      cookie.save('city',response.data.data[0].city);
      cookie.save('picture',response.data.data[0].picture);
      goToModify();
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
    <div>
                
                <Input 
              
              placeholder="Your E-mail"
              size='large'
              onChange={(e) => {
                setMail(e.target.value);
                console.log(mail)
              }}/>

              <Input 
              
              placeholder="Old Password"
              size='large'
              onChange={(e) => {
                setPassword(e.target.value);
                console.log(mail)
              }}/>




<Button type="primary" htmlType="submit" className="login-form-button"
              onClick={Login}
              >
                Confirm
              </Button>
            </div>
                
  );
}

export default ActiveChange;
