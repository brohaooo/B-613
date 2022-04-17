import { Form, Input, Button, Checkbox, Avatar,Card ,List} from 'antd';
import {planet} from '../picture/planet.png'
import { RightCircleOutlined,BellOutlined, EyeTwoTone,TeamOutlined, UserOutlined, SearchOutlined, LockOutlined, HomeOutlined, ThunderboltOutlined,StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies'

function Admin () {
  var allCard = [];
  var res;
  var that = this;
  var id;
  const goToModify = (id)=>{
    cookie.save('id',id);
    window.location.href="/modify";
   }
  const show = () => {
    axios.get('http://localhost:8080/api/users/', {
 })
    .then(function (response) { 
      console.log(response.data[0]);

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
  const [dataset,setDataset] = useState([]);


    return (

      <div>
        <Button
                onClick={show}
            >
                Click to show the information of all users.
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
        
        ID:{item.id}<br></br>
        Age:{item.age}<br></br>
        Gender:{item.gender}<br></br>
        User Email:{item.userEmail}<br></br>
        User Password:{item.password}<br></br>
        <Button 
                
            >
                Double click to modify its password
            </Button>
      </List.Item>
    )}
  />,
      </div>)

};

export default Admin;