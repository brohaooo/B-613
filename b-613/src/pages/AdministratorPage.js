import { Form, Input, Button, Checkbox, Avatar,Card ,List} from 'antd';
import {planet} from '../picture/planet.png'
import { RightCircleOutlined,BellOutlined, EyeTwoTone,TeamOutlined, UserOutlined, SearchOutlined, LockOutlined, HomeOutlined, ThunderboltOutlined,StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';

function Admin () {
  var allCard = [];
 
  // submit the change of  changing the password to back end
  const submit = (id) => {
    axios.put('http://localhost:8080/api/modifyPassword/' + id, {
      password: password,
      userName: username,
    })
    .then(function (response) {
      window.location.href="/admin";
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }; 

  // get all the information of the users
  const show = () => {
    axios.get('http://localhost:8080/api/users/', {
 })
    .then(function (response) { 

      let lengthOfResponse = Object.keys(response.data).length
      for(let i=0;i<lengthOfResponse;i++){
        allCard.push(response.data[i]);
      }
      setDataset(allCard);
        })
    .catch(function (error) {
      console.log(error);
    })

  }; 
  // navigate to home
  const goToHome = () => {
    window.location.href="/";
  };

  // self-defined state to stored the data
  const [dataset,setDataset] = useState([]);
  const [password,setPassword] = useState('');
  const [username,setUsername] = useState('');  
 



    return (

      <div>
        <Button
                onClick={show}
            >
                Click to show the information of all users.
            </Button>
        <Button
            onClick={goToHome}
        >
            Click to goback to login page.
        </Button>

            <List
    itemLayout="horizontal"
    dataSource={dataset}
    renderItem={item => (
      
      <List.Item>
        <List.Item.Meta
          title={<a href="https://ant.design"></a>}
          

        />
        User Email:{item.userEmail}        <br></br>

        ID:{item.id}
        
        
        <br></br>
        Age:{item.age}
                    
                    <br></br>
        Gender:{item.gender}
        
        
        <br></br>
        City:{item.city}
        
        
        <br></br>
        User Profile Pictuer:{item.picture}
        <br></br>
        Username: {item.userName}
        <Input type="text" class="form-control"  placeholder="New Username"
                    onChange={(e) => {
                    setUsername(e.target.value);
                    console.log(password)
                    }}/>
        <br></br>
        User Password:{item.password}
        <Input type="text" class="form-control"  placeholder="New Password"
                    onChange={(e) => {
                    setPassword(e.target.value);
                    console.log(password)
                    }}/>
        <br></br>
        User Create Time:{item.createdAt}
        <br></br>
        Last Update Time:{item.updatedAt}
        

          <Button type="primary" htmlType="submit" className="login-form-button"
                onClick={ () => {submit(item.id)}}
            >
                Confirm 
            </Button>
      </List.Item>

    )}
  />,


      </div>)

};

export default Admin;