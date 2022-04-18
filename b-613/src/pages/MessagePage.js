import './InfoEdit.css';
import { Form, Input, Button, Checkbox, Avatar,List } from 'antd';
import { Layout,Sider,Header,Content,Footer } from 'antd';
import 'antd/dist/antd.css';
import logo from '../picture/logo.png';
import { useState } from 'react';
import axios from "axios";
import cookie from 'react-cookies'




function Message() {
  const uid = cookie.load('id');
  var allCard = [];

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

  
  const accept = (fid) => {
    
    axios.put('http://localhost:8080/api/dealRequest/' + uid + '/' + fid, {
      validateState: "approved"

    })
    .then(function (response) {
      console.log(response);
      //window.location.href="/friend";
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }; 

  const deny = (fid) => {
    
    axios.put('http://localhost:8080/api/dealRequest/' + uid + '/' + fid, {
      validateState: "denied"

    })
    .then(function (response) {
      console.log(response);
      //window.location.href="/friend";
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }; 

  const show = () => {
    
    axios.get('http://localhost:8080/api/checkFriendsRequests/' + uid, {
     

    })
    .then(function (response) {
      console.log(response.data);
      let lengthOfResponse = Object.keys(response.data).length
      for(let i=0;i<lengthOfResponse;i++){
        allCard.push(response.data[i]);
      }
      setDataset(allCard);
    })
    .catch(function (error) {
      console.log(error);
    });
   
  }; 


  const [dataset,setDataset] = useState('');

  const [userName,setUserName] = useState('');


  return (
<div className='page'>
<Button
                onClick={show}
            >
                Click to show all the friend requests
            </Button>
    
            <List
    itemLayout="horizontal"
    dataSource={dataset}
    renderItem={item => (
      
      <List.Item style = {{display: 'flex',justifyContent:'flex-start'}}>
        <div>
          User Email:{item.userEmail}        <br></br>

          ID:{item.id}
          
          <br></br>
          Age:{item.age}
                      
                      <br></br>
          Gender:{item.gender}
    
          <br></br>
          City:{item.city}
          
          
          <br></br>
          User Profile Picture:{item.picture}
          <br></br>
          Username: {item.userName}
        </div>
        
        <div style ={{display: "flex", flexDirection:'column', marginLeft:'50px'}}>
          <Button className='newMoment' style ={{width: '150px', marginTop: 0}} type="primary" shape="round"  onClick={() => {accept(item.id)} }>Accept</Button>
          <Button className='newMoment' style ={{width: '150px', marginTop: '20px'}} type="primary" shape="round"  onClick={() => {deny(item.id)} }>Deny</Button>
        </div>
        


        
      </List.Item>

    )}
  />,
</div>
                

               
  );
}

export default Message;