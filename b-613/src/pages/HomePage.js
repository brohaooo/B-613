
import './HomePage.css';
import { Form, Layout, Menu,Input, Select,Modal , Button, Upload, Avatar,Card } from 'antd';
import { MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined, PlusOutlined,TeamOutlined, SearchOutlined, LockOutlined, HomeOutlined, ThunderboltOutlined,StarOutlined,
  BellOutlined,AppstoreOutlined,SettingOutlined, RocketOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import logo from '../picture/logo.png'
import Moment from '../components/Moment';
import UserInfo from '../components/UserInfo';
import cookie, { select } from 'react-cookies';
import { useState, useEffect } from 'react';
import axios from 'axios';
const { Option } = Select;
const { TextArea } = Input;
const { Header, Sider, Content } = Layout;
const {Meta} = Card;

const Axios=axios.create({

  baseURL:'http://localhost:8080/api',
  withCredentials: true,

  //配置请求超时时间
  timeout: 5000
})


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};


function HomePage() {

  var allPlanets =[];
  const token = cookie.load('token');
  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url);
    setPreviewVisible(true);
    setPreviewTitle(file.name);
  };

  const changePic = () => {
    let fileData = document.querySelector("#uploadimg1").files[0];
    let formdata = new FormData();
    formdata.append("file", fileData);
    formdata.append("posterID", cookie.load('id'));
    formdata.append("text",momentText);
    formdata.append("RCID",momentPlanet);
    formdata.append("mood",momentMood);
    setMoment(formdata);
    console.log(formdata.get('id'));
  };

  const goToLogin = () => {
    window.location.href="/";
  };
  const goToRegister = () => {
    window.location.href="/register";
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
        setVisibleP(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleOkM = () => {
    axios.defaults.withCredentials=true;
    axios.defaults.headers.common["token"] = cookie.load('token');
    axios.post('http://localhost:8080/api/RCs/',{

      rcName: planetName,
      rcOwner: cookie.load('id'),
      rcTag: planetTag
    })
      .then(function (response) {
        console.log(response.data);
        setVisibleP(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const selectPlanet = ({ value: newVlue }) => {

  }


  const handelNewMoment = () => {
    console.log(cookie.load('token'));
    Axios({
      url: '/posts',
      method: 'POST',
      Headers: {
        "content-type": "multipart/form-data",
        "token": cookie.load('token')
      },
      data: moment,
    })
      setVisibleM(false);
  };

  const requestPlanet = () => {
    console.log(cookie.load('token'));
    axios.defaults.withCredentials=true;
    axios.defaults.headers.common["token"] = cookie.load('token');
    axios.get('http://localhost:8080/api/members/' + cookie.load('id'))
      .then(function (response) {
        console.log(response.data);
        setPlanetList(response.data);
        setCurrentPlanet(response.data[0].id)
        requestPlanetMoment(response.data[0].id);
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }

  const requestPlanetMoment = (currentP) => {
    console.log(cookie.load('token'));
    axios.defaults.withCredentials=true;
    axios.defaults.headers.common["token"] = cookie.load('token');
    axios.get('http://localhost:8080/api/posts/RCID/' + currentP)
      .then(function (response) {
        setMomentList(response.data);
        console.log("posts: ",response.data);  
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }


 
    
  const [visibleM, setVisibleM] = useState(false);
  const [visibleP, setVisibleP] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] =useState(false);
  const [previewImage, setPreviewImage] =useState('');
  const [previewTitle, setPreviewTitle] =useState('');
  const [planetName, setPlanetName] =useState('');
  const [momentText,setMomentText] =useState('');
  const [planetTag, setPlanetTag] =useState('friend');
  const [planetList, setPlanetList] =useState([]);
  const [momentList, setMomentList] =useState([]);
  const [momentContentList, setMomentContentList] =useState([]);
  const [momentPlanet, setMomentPlanet] =useState('');
  const [momentMood, setMomentMood] =useState('');
  const [moment, setMoment] =useState('');
  const [currentPLanet, setCurrentPlanet] =useState('');

  const [value, setValue] = useState(''); //used to make useEffect onlyrender one time
  const { SubMenu } = Menu;
  
  
  useEffect(() => {
    requestPlanet();
  }, [value]);

  var allCard = [];
  var selectPlanetList = [];
  console.log('length: ',momentList.length)
  for(let i=0;i<momentList.length;i++){
    axios.defaults.withCredentials=true;
    axios.defaults.headers.common["token"] = cookie.load('token');
    axios.get('http://localhost:8080/api/posts/' + momentList[i].id)
      .then(function (response) {
        var p = momentContentList;
        console.log(response.data.text)
        p.push(
          <Moment 
          username = {momentList[i].posterID} 
          content = {response.data.text} 
          ></Moment>
        )
        setMomentContentList(p);
        console.log("posts: ",response.data);  
      })
      .catch(function (error) {
        console.log(error);
      }); 
};
console.log('allposts: ', momentContentList);
  
for(let i=0;i<planetList.length;i++){
    selectPlanetList.push(
      <Option value={planetList[i].id}>{planetList[i].rcName}</Option>
    )
    allCard.push(<Card
            className='card'
            hoverable
            style={{ width: 100, height: 100,flexShrink: 0, marginRight: '15px' }}
            cover={<div style={{width: '100%',display: 'flex',justifyContent:'center'}}><Avatar style={{marginTop:'15px'}} size={32} icon={<UserOutlined />}  /></div>}
          >
            <Meta className='meta' title={planetList[i].rcName}/>
          </Card>)
};

  return (
    <div className='page-1'>
      
       <Menu
            onClick={(e) => {
              console.log('click ', e);
            }}
            style={{ width: '18%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
          >
            <div className='logo'>
              <img  src={require('../picture/logo.png') } alt="logo"></img>
            </div>
            <Menu.Item key="1" icon={<HomeOutlined size={18}></HomeOutlined>}>HomePage</Menu.Item>
            <Menu.Item key="2" onClick ={() =>{window.location.href="/friend";}} icon={<UserOutlined size={18} ></UserOutlined>}>Friend</Menu.Item>
            <Menu.Item key="3" onClick ={() =>{window.location.href="/message";}} icon={<BellOutlined size={18} ></BellOutlined>}>Message</Menu.Item>
            <Menu.Item key="4"icon={<RocketOutlined size={18} />}>Planet</Menu.Item>
            <Button className='newMoment' type="primary" shape="round" onClick={() => setVisibleM(true) }>New Moment</Button>
          <Button className='newMoment' type="primary" shape="round" onClick={() => setVisibleP(true) }>New Planet</Button>
        </Menu>
        
      {/* </div> */}
      <div className='right-part'>
        <div className='top-bar'>
        {allCard}
        </div>
        <div className='content'>
          <div className='content-moment'>
            {momentContentList}
          </div>
          <UserInfo></UserInfo>
        </div>
      </div>
      <Modal
        title="New Planet"
        centered
        visible={visibleM}
        onOk={handelNewMoment}
        onCancel={() => setVisibleM(false)}
        width={700}
      >
        <TextArea rows={4} placeholder="maxLength is 200" maxLength={200} onChange={(e) => {setMomentText(e.target.value)}} />
        <Select   style={{ width: 120 }} onChange={(value) => {
          setMomentPlanet(value);
          console.log(`select${value}`)}}>
          {selectPlanetList}
        </Select>
        <Select defaultValue='happy' style={{ width: 120 }} onChange={(value) =>{
          setMomentMood(value)
        }}>
          <Option value="happy">Happy</Option>
          <Option value="normal">Normal</Option>
          <Option value="bad">Bad</Option>
        </Select>
        <input type="file" name="file" multiple="multiple" id="uploadimg1" onChange={changePic}/>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Modal>

      <Modal
        title="Modal 1000px width"
        centered
        visible={visibleP}
        onCancel={() => setVisibleP(false)}
        width={1000}
        onOk={handleOkP}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} 
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
        <Select defaultValue={planetTag} style={{ width: 120 }} onChange={selectPlanet}>
          <Option value="friend">Friend</Option>
          <Option value="couple">Couple</Option>
          <Option value="family">Family</Option>
        </Select>
      </Modal>
    </div>


  );
}

export default HomePage;