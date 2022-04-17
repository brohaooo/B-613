import { Form, Input, Button, Checkbox, Avatar,Card ,List} from 'antd';
import {planet} from '../picture/planet.png'
import { RightCircleOutlined,BellOutlined, EyeTwoTone,TeamOutlined, UserOutlined, SearchOutlined, LockOutlined, HomeOutlined, ThunderboltOutlined,StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';

function Admin () {
  var allCard = [];
  var res;
  var that = this;

 
  const show = () => {
    axios.get('http://localhost:8080/api/users/', {
 })
    .then(function (response) { 
      console.log(response.data[0]);
      for(let i=0;i<5;i++){
        allCard.push(response.data[i]);
      }
      setDataset(allCard);
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
                show
            </Button>
            {console.log(allCard[0])}
            <List
    itemLayout="horizontal"
    dataSource={dataset}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          title={<a href="https://ant.design">Username: {item.userName}</a>}
          

        />
        Age:{item.age}<br></br>
        Gender:{item.gender}<br></br>
        User Email:{item.userEmail}<br></br>
        User Password:{item.password}<br></br>
        
      </List.Item>
    )}
  />,
      </div>)

};

export default Admin;