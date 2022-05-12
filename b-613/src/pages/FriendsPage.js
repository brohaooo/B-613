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
  // load the id of the user from cookie
  const uid = cookie.load('id');

  //show the modal box of add new friend
  const handleFriendAdd = () => {
    setVisibleM(true);   
  };
  
  // get all the friends of the user from the back end
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

  // submit the add friend request 
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

  // submit the delete request to the back end to delete friends
  const submitDelete = (fid) => {
    axios.delete('http://localhost:8080/api/friends/' + uid + '/' + fid, {

    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }; 

  const [friendid, setFriendID] = useState('');
  const [dataset,setDataset] = useState([]);
  const [visibleM, setVisibleM] = useState(false);
  const [value, setValue] = useState('');

//use useEffect to re render the page 
useEffect(() => {
    show();
  }, [value]);

  return (
    <div style = {{width:'100%'}}>
      {/* list that show all the friends card */}
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
  {/* modal that used to add friend */}
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