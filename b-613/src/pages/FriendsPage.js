import { Form, Input, Button, Checkbox, Avatar,Card ,List} from 'antd';
import {planet} from '../picture/planet.png'
import { RightCircleOutlined,BellOutlined, EyeTwoTone,TeamOutlined, UserOutlined, SearchOutlined, LockOutlined, HomeOutlined, ThunderboltOutlined,StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';



function Friend () {
  var allCard = [];
  var res = [];
  var that = this;
  var id;

  const uid = cookie.load('id');
  
  const show = () => {
    axios.get('http://localhost:8080/api/friends/' + uid, {
 })
    .then(function (response) {
      let lengthOfResponse = Object.keys(response.data).length;
      for(let i=0;i<lengthOfResponse;i++){
        allCard.push(response.data[i].friendID);
      }
      for(let i=0;i<allCard.length;i++){
        axios.get('http://localhost:8080/api/users/'+allCard[i], {
      })
      .then(function(response)
        {
          console.log(response.data);
          for(let i =0; i<3;i++){
            res.push(response.date[i]);
            setDataset(res);}
          }
          
      )
      .catch(function (error) {
        console.log(error);
      })

      }

    })    
    .catch(function (error) {
      console.log(error);
    })
      
  }; 
  const [dataset,setDataset] = useState([]);


  return (

    <div>
      <Button
              onClick={show}
          >
              Click to show the information of all users.
      </Button>
          {console.log('1')}
  <List
  itemLayout="horizontal"
  dataSource={dataset}
  renderItem={item => (
    <List.Item>
      <List.Item.Meta
        title={<a href="https://ant.design">Username: {item.userName}</a>}
        

      />
      
      ID:{item.userID}<br></br>
      Age:{item.age}<br></br>
      Gender:{item.gender}<br></br>
      User Email:{item.userEmail}<br></br>
      
        
    </List.Item>

  )}
  />,


    </div>
    );

}

export default Friend;