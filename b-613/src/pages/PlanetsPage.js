import { Form, Input, Button, Checkbox, Avatar,Card ,List,Modal, Select} from 'antd';
import {planet} from '../picture/planet.png'
import { RightCircleOutlined,BellOutlined, EyeTwoTone,TeamOutlined, UserOutlined, SearchOutlined, LockOutlined, HomeOutlined, ThunderboltOutlined,StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import './PlanetsPage.css';


const { Option } = Select;
const { TextArea } = Input;




function Planet () {

  const uid = cookie.load('id');
  // requests for the planets list data from the back end and set the data to the state
  const show = () => {
    console.log(uid);
    axios.defaults.withCredentials=true;
    axios.defaults.headers.common["token"] = cookie.load('token');
    axios.get('http://localhost:8080/api/members/' + cookie.load('id'))
      .then(function (response) {
        console.log('checkall:  ',response.data);
        setDataset(response.data);
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }; 
// submit the planet invitation request to the back end
  const submit = () => {
    console.log('planet:',planetID);
      if(planetID){
        axios.post('http://localhost:8080/api/rcRequest', {
        userID: friendid,
        inviterID: uid,
        RCID: planetID,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  // show the modal where to input the friend id to add
  }; 
  const submitInvite = (pid) => {
    console.log('pid: ', pid);
    setPlanetID(pid);
    setVisibleI(true);
  }; 

  // change the tag information stored which for the new created planet
  function handleChange(value) {
    console.log(`selected ${value}`);
    setPlanetTag(value);
  }
  
// submiet the new created planet information request to back end 
  const handleOkP = () => {
    console.log(cookie.load('token'))
    axios.defaults.withCredentials=true;
    axios.defaults.headers.common["token"] = cookie.load('token');
    axios.post('http://localhost:8080/api/RCs/',{

      rcName: planetName,
      rcOwner: cookie.load('id'),
      rcTag: planetTag
    })
      .then(function (response) {
        console.log(response.data);
        setValue('1');
        setVisibleP(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

// self defined state
  const [friendid, setFriendID] = useState('');
  const [userid, setUserID] = useState('');
  const [validatestate, setValidateState] = useState('');
  const [planetName, setPlanetName] =useState('');
  const [planetID, setPlanetID] =useState('');
  const [dataset,setDataset] = useState([]);
  const [visibleM, setVisibleM] = useState(false);
  const [visibleP, setVisibleP] = useState(false);
  const [visibleI, setVisibleI] = useState(false);
  const [value, setValue] = useState('');
  const [planetTag, setPlanetTag] =useState('friend');
useEffect(() => {
    show();
  }, [value]);

  return (
    <div style = {{width:'100%'}}>
  <List
  style={{marginTop: '10px', padding: '0 20px 0 20px'}}
  itemLayout="horizontal"
  grid={{ gutter: 16, column: 4 }}
  dataSource={dataset}
  renderItem={item => (
    <List.Item>
      <div className='planetCard' >
        <img style={{width: '30%',height: '30%', marginTop: '10%', objectFit: 'contain'}} src = {require('../picture/planet_logo.PNG')}></img>
        <div className='planetInfo'>
          <div className='planetTitle'>{item.rcName}</div>
          <div className='planetTag'>#{item.rcTag}</div>
        </div>
        <Button className='addBtn' type="primary"  shape="round" onClick={() => {submitInvite(item.id)} }>Add Friend</Button>
      </div>
    </List.Item>
  )}
  />,
      
      <Button className='addPlanet' type="primary" shape="round" onClick={() => setVisibleP(true) }>New</Button>
      {/* modal box to create new planet */}
      <Modal
        title="New Planet"
        centered
        visible={visibleP}
        onCancel={() => setVisibleP(false)}
        width={300}
        onOk={handleOkP}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />}
              style={{ width: '100%'}} 
              placeholder="PlanetName" 
              className='login-input'
              size='large'
              onChange={(e) => {
                setPlanetName(e.target.value);
                console.log(planetName)
              }}
              onClick={(e) => {
                setPlanetName(e.target.value);
                console.log(planetName)
              }}/>
        <Select defaultValue={planetTag} style={{ width: '100%', marginTop: '20px'}} onChange={handleChange}>
          <Option value="friend">Friend</Option>
          <Option value="couple">Couple</Option>
          <Option value="family">Family</Option>
        </Select>
      </Modal>
      <Modal
        title="Invite your friends into the Planet!!!"
        centered
        visible={visibleI}
        onOk={() => {
          submit();
          setVisibleI(false);}}
        onCancel={() => setVisibleI(false)}
        width={500}
      >
        <Input type="text" class="form-control" 
            placeholder="Added Friend ID"
            onChange={(e) => {
            setFriendID(e.target.value);
        }}/>       
      </Modal>
    </div>
    );

}

export default Planet;