
import './RegisterPage.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined,UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from "axios";
import cookie from 'react-cookies'


const password = cookie.load('password');

const id = cookie.load('id');




function RegisterPage() {
  const goToLogin = () => {
    window.location.href="/";
  };
  const goToRegister = () => {
    window.location.href="/register";
  };
  const goToSuccess = () => {
    window.location.href="/success";
  };
 
  const submit = () => {
    
    axios.put('http://localhost:8080/api/modifyPassword/' + id, {
      password: password,
    })
    .then(function (response) {
      console.log(response);
      goToLogin();
    })
    .catch(function (error) {
      console.log(error);
    });
    setPassword('');
  }; 
  
  

  const [password,setPassword] = useState('');

  return (
<div className='page'>
    <div className="container">
        <div class="panel-heading text-center">
            <h1 class="panel-title">
                <b>Welcome to modify your password.</b>
            </h1>
        </div>

    
        <div className="panel-body">
      

            <div>
                <span class="input-group-addon">Your New Password:</span>
                <Input type="text" class="form-control"  placeholder="New Password"
                    onChange={(e) => {
                    setPassword(e.target.value);
                    console.log(password)
                    }}/>
            </div>

            

            <Button type="primary" htmlType="submit" className="login-form-button"
                onClick={submit}
            >
                Confirm
            </Button>
        </div>
    </div>
</div>
                

               
  );
}

export default RegisterPage;
