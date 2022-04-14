
import './HomePage.css';
import { Form, Input, Button, Checkbox, Avatar,Card } from 'antd';
import {planet} from '../picture/planet.png'
import { RightCircleOutlined,BellOutlined, EyeTwoTone,TeamOutlined, UserOutlined, SearchOutlined, LockOutlined, HomeOutlined, ThunderboltOutlined,StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import logo from '../picture/logo.png'
import Moment from '../components/Moment';


const {Meta} = Card;

function HomePage() {
  var o = new Image;
  o.src = '../2.png';
  var allCard=[];
  for(let i=0;i<9;i++){
        allCard.push(<Card
                className='card'
                hoverable
                style={{ width: 100, height: 100,flexShrink: 0, marginRight: '15px' }}
                cover={<div style={{width: '100%',display: 'flex',justifyContent:'center'}}><Avatar style={{marginTop:'15px'}} size={32} icon={<UserOutlined />}  /></div>}
              >
                <Meta className='meta' title="Planet"/>
              </Card>)
      
  };

  const goToLogin = () => {
    window.location.href="/";
  };
  const goToRegister = () => {
    window.location.href="/register";
  };

  

  return (
    <div className='page-1'>
      <div className='left-menu'>
        <div className='logo'>
          <img  src={require('../picture/logo.png') } alt="logo"></img>
        </div>
       <div className='item-menu'>
         <div className='menuItem'>
          <HomeOutlined style={{fontSize:'35px', color: '#9c9c9c'}}/>
          <h2>Home</h2>
        </div>
        <div className='menuItem'>
          <TeamOutlined style={{fontSize:'35px', color: '#9c9c9c' }}/>
          <h2>Friends</h2>
        </div>
        <div className='menuItem'>
          <BellOutlined style={{fontSize:'35px', color: '#9c9c9c'}}/>
          <h2>Message</h2>
        </div>
        <div className='menuItem'>
          <img src={require('../picture/planet_un.png')  }  className='left_logo' alt="logo"></img>
          <h2>Planet</h2>
        </div>
       </div>
        
        <div className='avatar'>
          <Avatar size={64} icon={<UserOutlined />}  />
          <h2 className='avatarName'>Username</h2>
        </div>
        <Button className='newMoment' type="primary" shape="round">New Moment</Button>
      </div>
      <div className='right-part'>
        <div className='top-bar'>
        {allCard}
      </div>
        <div className='content'>
          <Moment></Moment>
        </div>
      </div>
    </div>
  );
}

export default HomePage;