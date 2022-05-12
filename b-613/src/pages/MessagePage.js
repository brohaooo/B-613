import './InfoEdit.css';
import { Form, Input, Button, Checkbox, Avatar,List } from 'antd';
import { Layout,Sider,Header,Content,Footer } from 'antd';
import 'antd/dist/antd.css';
import logo from '../picture/logo.png';
import { useState, useEffect } from 'react';
import axios from "axios";
import cookie from 'react-cookies';
import './MessagePage.css';



function Message() {
  const uid = cookie.load('id');
  var allCard = [];
  var allRequest = [];

  // submit the accept status to the back end to deal with the request 
  const accept = (fid) => {
    axios.put('http://localhost:8080/api/dealRequest/' + uid + '/' + fid, {
      validateState: "approved"
    })
    .then(function (response) {
      console.log(response);
      setValue('1');
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }; 
  // submit the deny status to the back end to deal with the request 
  const deny = (fid) => {
    axios.put('http://localhost:8080/api/dealRequest/' + uid + '/' + fid, {
      validateState: "denied"

    })
    .then(function (response) {
      console.log(response);
      setValue('1');
      //window.location.href="/friend";
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }; 

  // submit the accept invitation status to the back end to deal with the request 
  const acceptInvite = (rid) => {
    axios.post('http://localhost:8080/api/handleRcRequest/', {
      action: "approve",
      id: rid,
    })
    .then(function (response) {
      console.log(response);
      setValue('1');
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }; 
  // submit the deny invitationstatus to the back end to deal with the request 
  const denyInvite = (rid) => {
    axios.post('http://localhost:8080/api/handleRcRequest/', {
      action: "deny",
      id: rid,
    })
    .then(function (response) {
      console.log(response);
      setValue('1');
      //window.location.href="/friend";
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }; 
// request all the friend requests and invitation request from the back end and stored these return data list 
  const show = () => {
    axios.get('http://localhost:8080/api/checkFriendsRequests/' + uid, {
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
    });

    axios.get('http://localhost:8080/api/rcRequest/' + uid, {
    })
    .then(function (response) {
      console.log('firstResponse: ',response.data);
      let firstResponse = response.data;
      let lengthOfResponse = Object.keys(response.data).length
      for(let i=0;i<lengthOfResponse;i++){
        axios.defaults.withCredentials=true;
        axios.defaults.headers.common["token"] = cookie.load('token');
        axios.get('http://localhost:8080/api/users/' + firstResponse[i].inviterID)
          .then(function (response) {
            let secondResponse = response.data;
            axios.defaults.withCredentials=true;
            axios.defaults.headers.common["token"] = cookie.load('token');
            axios.get('http://localhost:8080/api/RCs/' + firstResponse[i].RCID) 
              .then(function (response) {
                setPlanetDataset(preState => [...preState,{
                  rcName: response.data.rcName,
                  rcID: firstResponse.RCID,
                  inviterName: secondResponse.userName,
                  inviterEmail: secondResponse.userEmail,
                  inviterPicture: secondResponse.picture,
                  inviterID: firstResponse[i].inviterID,
                  id: firstResponse[i].id,
                }
                ])
              })
              .catch(function (error) {
                console.log(error);
              }); 
          })
          .catch(function (error) {
            console.log(error);
          }); 
      }
      setPlanetDataset(allRequest);
    })
    .catch(function (error) {
      console.log(error);
    });
   
  }; 


  const [dataset,setDataset] = useState('');
  const [planetDataset,setPlanetDataset] = useState([]);
  const [value,setValue] = useState('');


  useEffect(() => {
    show();
  }, [value]);

  return (
  <div className='page'>
    <div className='messagePageTitle'>Friends Requests:</div>
    <List
      itemLayout="horizontal"
      dataSource={dataset}
      renderItem={item => (
      <List.Item style = {{display: 'flex',justifyContent:'flex-start'}}>
        <div className='message'>
          <Avatar className='message-avatar' size={64} src={item.picture!=='default.png'?require(`../../../back-end/upload/${item.picture}`): require(`../picture/ufo.png`)}  />
          <div className='messageInfo'>
            <div className='messageInfo-user'>
              {item.userName} ({item.userEmail})
            </div>
            Requests to add you as a friend
          </div>
          <div style ={{display: "flex", flexDirection:'column', position: 'absolute',right: '5%', width: '10%'}}>
            <Button className='messageBtn' type="primary" shape="round"  onClick={() => {accept(item.id)} }>Accept</Button>
            <Button className='messageBtn' type="primary" shape="round"  onClick={() => {deny(item.id)} }>Deny</Button>
          </div>
        </div>
      </List.Item>

    )}
  />,
  <div className='messagePageTitle'>Planet Invitation: </div>
    <List
    itemLayout="horizontal"
    dataSource={planetDataset}
    renderItem={item => (
    <List.Item style = {{display: 'flex',justifyContent:'flex-start'}}>
      <div className='message'>
        <Avatar className='message-avatar' size={64} src={item.inviterPicture!=='default.png'?item.inviterPicture!==undefined?require(`../../../back-end/upload/${item.inviterPicture}`): require(`../picture/ufo.png`):require(`../picture/ufo.png`)}  />
        <div className='messageInfo'>
          <div className='messageInfo-user'>
            {item.inviterName} ({item.inviterEmail})
          </div>
          Requests to add you into the Planet: {item.rcName}
        </div>
        <div style ={{display: "flex", flexDirection:'column', position: 'absolute',right: '5%', width: '10%'}}>
          <Button className='messageBtn' type="primary" shape="round"  onClick={() => {acceptInvite(item.id)} }>Accept</Button>
          <Button className='messageBtn' type="primary" shape="round"  onClick={() => {denyInvite(item.id)} }>Deny</Button>
        </div>
      </div>
    </List.Item>
  )}
  />,
  </div>      
  );
}

export default Message;