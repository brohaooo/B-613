
import './Moment.css';
import { Form, Input, Button, Checkbox , Avatar, Card, Image} from 'antd';
import {  UserOutlined, LockOutlined, SmileOutlined,HeartOutlined, CommentOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';

function Moment(props) {
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
    <div className="moment">
      <div className='moment-left'>
        <Avatar size={50} icon={<UserOutlined />}  />
      </div>
      <div className='moment-right'>
      <div className='moment-1'>
              <div className='moment-avartar-name'>{props.username}</div>
              <div className='moment-avartar-mood'><SmileOutlined style={{fontSize: '40px', color: '#555fa3'}}/></div>
            </div>
            <div className='momment-comment'>
              <p>{props.content}</p>
            </div>
            <Image
              className='moment-image'
              width={'100%'}
              src={require('../picture/space.jpg')}
            />
            <div className='moment-bottom-bar'>
              <div className='likes'>
                <HeartOutlined className='bottom-bar-button' />
                <div className='bottom-bar-number'>1</div>
              </div>
              <div className='likes'>
                <CommentOutlined className='bottom-bar-button'/>
                <div className='bottom-bar-number'>23</div>
              </div>
            </div>
          </div>
      </div>
      
  );
}

export default Moment;
