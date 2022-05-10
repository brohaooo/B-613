import './InfoEdit.css';
import { Form, Input, Button, Checkbox, Avatar,Upload } from 'antd';
import { Layout,Sider,Header,Content,Footer } from 'antd';
import 'antd/dist/antd.css';
import logo from '../picture/logo.png';
import { useState } from 'react';
import axios from "axios";
import cookie from 'react-cookies'
import {  PlusOutlined} from '@ant-design/icons';



function InfoEdit() {
  const id = cookie.load('id');

  const goToLogin = () => {
    window.location.href="/";
  };
  const goToActive = () => {
    window.location.href="/active";
  };
  const goToRegister = () => {
    window.location.href="/register";
  };
  const goToHomePage = () => {
    window.location.href="/home";
  };

  const changeAvatar = (FL) => {

    let fileData = FL;
    let formdata = new FormData();
    formdata.append("file", fileData);
    formdata.append("id", cookie.load('id'));
    setAvatar(formdata);
    console.log(formdata.get('id'));
};


  const submitAvatar = () => {
    let headers = {
      'Content-Type': 'multipart/form-data',
      'token' : cookie.load('token')
    }
      axios.defaults.withCredentials=true;
      axios.post(
          "http://localhost:8080/api/userPhoto/", avatar,{headers: headers}
      ).then(res => {
          console.log(res.data)
      }).catch(err => {
          console.log("错误")
          console.error(err);
      });
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const submit = () => {
    submitAvatar();
    axios.put('http://localhost:8080/api/modifyPassword/' + id, {
      gender: gender,
      userName: userName,
      age: age,
      city: city
    })
    .then(function (response) {
      console.log(response);
      axios.defaults.withCredentials=true;
      axios.defaults.headers.common["token"] = cookie.load('token');
      axios.get('http://localhost:8080/api/users/' + id)
        .then(function (response) {
          console.log('edit: ',response.data);
          cookie.save('id',response.data.id);
          cookie.save('userName',response.data.userName); 
          cookie.save('userEmail',response.data.userEmail); 
          cookie.save('age',response.data.age); 
          cookie.save('password',response.data.password); 
          cookie.save('gender',response.data.gender); 
          cookie.save('city',response.data.city);
          cookie.save('picture',response.data.picture);
        })
        .catch(function (error) {
          console.log(error);
        }); 
      goToHomePage();
    })
    .catch(function (error) {
      console.log(error);
    });
    setGender('');
    setUserName('');
    setAge('');
    setCity('');
  }; 

  const [gender,setGender] = useState('');
  const [age,setAge] = useState('');
  const [city,setCity] = useState('');

  const [userName,setUserName] = useState('');
  const [avatar,setAvatar] = useState('');
  const [fileList, setFileList] = useState([]);

  return (
<div className='page'>
    <div className="container">
        <div class="panel-heading text-center">
            <h1 class="panel-title">
                <b style={{color: 'white', marginTop: '30px'}}>Welcome to edit your profile information.</b>
            </h1>
        </div>
        <div class="panel-heading text-center">
            <h3>
                <b style={{color: 'white'}}>Enter your new information</b>
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
                    placeholder="Age"
                    onChange={(e) => {
                    setAge(e.target.value);
                    console.log(age)
                }}/>
            </div>

            <div class="input-group">
                <span class="input-group-addon">Your City:</span>
                <Input type="text" class="form-control" 
                    placeholder="City"
                    onChange={(e) => {
                    setCity(e.target.value);
                    console.log(age)
                }}/>
            </div>


            {/* <Button onClick={submitAvatar}>Upload your profile picture:</Button> */}
            {/* <input type="file" name="file" multiple="multiple" id="uploadimg1" onChange={changeAvatar}/> */}
            <Upload
                multiple={false}
                listType="picture-card"
                beforeUpload={() => {
                    return false;
                }}
                onChange={(info) => { setFileList(info.fileList);
                  changeAvatar(info.file);
                console.log('pictureeeeeee',info) }}
                action=''
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Button type="primary" htmlType="submit" className="login-form-button"
                onClick={submit}
            >
                Confirm
            </Button>

            <Button className="login-form-button" onClick={goToActive}>Change your password</Button>
        </div>
    </div>
</div>
                

               
  );
}

export default InfoEdit;