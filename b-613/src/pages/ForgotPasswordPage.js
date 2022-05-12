
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import {  UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies'
import './ForgetPassword.css'


//show the error message if the valid code is wrong
function showerror() {
  Modal.error({
    title: 'Error!!!',
    content: 'The valid code is incorrect!!',
  });
}
// 
function ForgotPassword() {
  // navigate to modify page
  const goToModify = () => {
    window.location.href="/modify";
  };

  // post the valid code and the email to the back end to check whether they are match
  const submit = () => {
    console.log(validCode);
    console.log(mail);
    axios.post('http://localhost:8080/api/codeChecking/', {
      code: validCode,
      userEmail: mail,
    })
    .then(function (response) {
      console.log(response);
      if(response.data.state == "valid"){
        Login();
      }
      else{
        console.log("verify code is wrong!")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    setUserName('');
  }; 

  // post the request to back end to send the valid code to the target email address
  const submitValid = () => {
    axios.post('http://localhost:8080/api/verifyEmail/', {
      userEmail: mail,
      })
      .then(function (response) {
        console.log(response.data.state);
        
          axios.post('http://localhost:8080/api/codeSending/', {
                userEmail: mail,
                })
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
      
      })
      .catch(function (error) {
        showerror();
        console.log(error);
      });
    };

  
  const Login = () => {
    axios.post('http://localhost:8080/api/getIDViaEmail/', {
      userEmail: mail,
    })
    .then(function (response) { 
      console.log(response.data[0].id);
      cookie.save('id',response.data[0].id);
     
      goToModify();
      })
    .catch(function (error) {
      console.log(error);
    });
  };

  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [mail,setMail] = useState('');
  const [validCode,setValidCode] = useState('');


  return (
    <div className='FoegetPasswordPage'>
      <div className='forgetBox'>
        <span class="input-group-addon">Your Email:</span>
        <Input 
        className='FGinput'
          placeholder="E-mail"
          size='large'
          onChange={(e) => {
            setMail(e.target.value);
            console.log(mail)
          }}/>


        <Button type="primary" htmlType="submit" className="FG-form-button"
          onClick={submitValid}
          >
            Send Verification Code
        </Button>

        Valid Code:
        <Input 
        className='FGinput'
        placeholder="ValidCode"
        size='large'
        onChange={(e) => {
          setValidCode(e.target.value);
        }}/>
        <Button type="primary" htmlType="submit" className="FG-form-button"
          onClick={submit}
          >
            Confirm
        </Button>
      </div>
      
    </div>
                
  );
}

export default ForgotPassword;
