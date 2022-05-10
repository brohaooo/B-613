import { Form, Input, Button, Checkbox, Avatar,Card ,List,Modal} from 'antd';
import {planet} from '../picture/planet.png'
import { RightCircleOutlined,BellOutlined, EyeTwoTone,TeamOutlined, UserOutlined, SearchOutlined, LockOutlined, HomeOutlined, ThunderboltOutlined,StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import './FriendsPage.css';


function Friend () {
  var allCard = [];
  var that = this;
  var id;

  const uid = cookie.load('id');

  const handleFriendAdd = () => {
    setVisibleM(true);   
  };
  
  
  const show = () => {
    console.log(uid);
    axios.get('http://localhost:8080/api/checkFriends/' + uid)
    .then(function (response) {
        console.log('friends',response.data);
        let lengthOfResponse = Object.keys(response.data).length;
        for(let i=0;i<lengthOfResponse;i++){
          allCard.push(response.data[i]);
        }
        setDataset(allCard);
       console.log(allCard);
      }
      )
      .catch(function (error) {
      })
  }; 

  const submit = () => {
    
    axios.post('http://localhost:8080/api/friends', {
      userID: uid,
      friendID: friendid,
      validateState: 'pending'

    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }; 
  const submitDelete = (fid) => {
    
    axios.delete('http://localhost:8080/api/friends/' + uid + '/' + fid, {

    })
    .then(function (response) {
      console.log(response);
      // window.location.href="/friend";
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }; 

  const [friendid, setFriendID] = useState('');
  const [userid, setUserID] = useState('');
  const [validatestate, setValidateState] = useState('');
  const [dataset,setDataset] = useState([]);
  const [visibleM, setVisibleM] = useState(false);
  const [value, setValue] = useState('');

useEffect(() => {
    show();
  }, [value]);

  return (
    <div style = {{width:'100%'}}>

      {/* <Button onClick={show}>
              Click to show the information of all users.
      </Button> */}
  <List
  itemLayout="horizontal"
  style={{marginTop: '20px'}}
  grid={{ gutter: 16, column: 3 }}
  dataSource={dataset}
  renderItem={item => (
    <List.Item style={{display: 'flex', justifyContent: 'center'}}>
      <div className='friendCard' >
      <Avatar className='friend-avatar' size={64} src={item.picture!=='default.png'?require(`../../../back-end/upload/${item.picture}`):require(`../picture/ufo.png`)}  />
        <div className='friendInfo' style={{}}>
          Friend ID: {item.id}<br></br>
          Friend Username: {item.userName}<br></br>
          Age: {item.age}<br></br>
          Gender: {item.gender}<br></br>
          User Email: {item.userEmail}<br></br>
        </div>
        <Button className='deleteBtn' type="primary"  shape="round" onClick={() => {submitDelete(1)} }>Delete</Button>
      </div>
      
     

        
    </List.Item>

  )}
  />,
      <Modal
        title="Friend Add"
        centered
        visible={visibleM}
        onOk={() => {
          submit();
          setVisibleM(false);}}
        onCancel={() => setVisibleM(false)}
        width={300}
      >
        <Input type="text" class="form-control" 
            placeholder="Added Friend ID"
            onChange={(e) => {
            setFriendID(e.target.value);
        }}/>       
      </Modal>
      <Button className='addFriend' type="primary" shape="round" onClick={handleFriendAdd }>Add</Button>
    </div>
    );

}

export default Friend;