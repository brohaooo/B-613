
import './InfoEdit.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Layout,Sider,Header,Content,Footer } from 'antd';
import 'antd/dist/antd.css';
import logo from '../picture/logo.png';
import { useState } from 'react';
import axios from "axios";



function InfoEdit() {

  const goToLogin = () => {
    window.location.href="/";
  };
  const goToRegister = () => {
    window.location.href="/register";
  };
  const goToHomePage = () => {
    window.location.href="/home";
  };
  const showFriends = () => {
    window.location.href="/home";
  };

  const submit = () => {
    axios.post('http://localhost:8080/api/users/', {
      userName: userName,
      age: age,
      gender: gender,

    })
    .then(function (response) {
    goToHomePage();
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    setUserName('');
    setGender('');
    setAge('');
  }; 
  const [userName,setUserName] = useState('');
  const [gender,setGender] = useState('');
  const [age,setAge] = useState('');


  return (
<div className='page'>
    <div className="container">
        <div class="panel-heading text-center">
            <h1 class="panel-title">
                <b>Welcome to edit your profile information.</b>
            </h1>
        </div>



        <div class="panel-heading text-center">
            <h3>
                <b>Enter your new information</b>
            </h3>
        </div>
    
        <div className="panel-body">
            <div>
                <span class="input-group-addon">Your New Username:</span>
                <Input type="text" class="form-control"  placeholder="Username"
                    onChange={(e) => {
                    setUserName(e.target.value);
                    console.log(userName)
                    }}/>
            </div>

            <div className='input-group'>
            <span class="input-group-addon">Choose Your Gender:</span>
            <div className="gender" data-toggle="buttons">
                
                <label className="btn btn-primary" onClick={(e) => {
                                setGender("Female");
                                console.log(gender)
                              }}>
                    <Input type="radio" className="options" value="0" v-model="user.sex" id="sex0"/>
                    Female
                </label>
                <label class="btn btn-primary" OnClick={(e) => {
                    setGender("Male");
                    console.log(gender)
                  }}>
                    <Input type="radio" className="options" value="1" v-model="user.sex" id="sex1"/>
                    Male
                </label>    
            </div>
            </div>
            

            <div class="input-group">
                <span class="input-group-addon">Your Age:</span>
                <Input type="text" class="form-control" 
                    placeholder="请输入"
                    onChange={(e) => {
                    setAge(e.target.value);
                    console.log(age)
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

export default InfoEdit;