import { Form, Input, Button, Checkbox, Avatar,Card ,List,Modal} from 'antd';
import {planet} from '../picture/planet.png'
import { RightCircleOutlined,BellOutlined, EyeTwoTone,TeamOutlined, UserOutlined, SearchOutlined, LockOutlined, HomeOutlined, ThunderboltOutlined,StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';



function Friend () {
  var allCard = [];
  var that = this;
  var id;

  const uid = cookie.load('id');

  const handleFriendAdd = () => {
   // let fileData = fileList[0];
   // let formdata = new FormData();
   // console.log(fileData);

    setVisibleM(true);
   // console.log(cookie.load('token'));
  //  axios.defaults.withCredentials=true;
    //axios.defaults.headers.common["token"] = cookie.load('token');
    
  };
  
  
  const show = () => {
    console.log(uid);

    axios.get('http://localhost:8080/api/checkFriends/' + uid, {
 })
    .then(function (response) {
        //console.log(response);
        let lengthOfResponse = Object.keys(response.data).length;
        for(let i=0;i<lengthOfResponse;i++){
          allCard.push(response.data[i]);
        }
        setDataset(allCard);
       console.log(allCard);
      }
          
      )
      .catch(function (error) {
        //console.log(error);
      })

    
    
   // console.log(res)
  }; 

  const submit = () => {
    
    axios.post('http://localhost:8080/api/friends', {
      userID: uid,
      friendID: friendid,
      validateState: 'pending'

    })
    .then(function (response) {
      console.log(response);
      window.location.href="/friend";

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
      window.location.href="/friend";
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



  return (
    <div>

      <Button
              onClick={show}
          >
              Click to show the information of all users.
      </Button>
  <List
  itemLayout="horizontal"
  dataSource={dataset}
  renderItem={item => (
    <List.Item>
      <List.Item.Meta
        title={<a href="https://ant.design"></a>}
        

      />
     Friend ID:{item.id}
     
     <br></br>
    
     Friend Username: {item.userName}<br></br>
      Age:{item.age}<br></br>
      Gender:{item.gender}<br></br>
      User Email:{item.userEmail}<br></br>
      <Button className='newMoment' type="primary" shape="round" onClick={() => {submitDelete(item.friendID)} }>Delete</Button>

        
    </List.Item>

  )}
  />,

<Button className='newMoment' type="primary" shape="round" onClick={handleFriendAdd }>Add Friend</Button>


<Modal
        title="Friend Add"
        centered
        visible={visibleM}
        onOk={() => setVisibleM(false)}
        onCancel={() => setVisibleM(false)}
        width={700}
      >
      <Input type="text" class="form-control" 
                    placeholder="Added Friend ID"
                    onChange={(e) => {
                    setFriendID(e.target.value);
                }}/>
                
        
       <Button className='newMoment' type="primary" shape="round" onClick={submit }>Confirm</Button>


       




      </Modal>

    </div>
    );

}

export default Friend;