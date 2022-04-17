
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


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};


function HomePage() {

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

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
  }

  const selectPlanet = ({ value: newVlue }) => {

  }

  const requestPlanet = () => {
    axios.defaults.headers.common["token"] = cookie.load('token');
    axios.get('http://localhost:8080/api/members/' + cookie.load('id'))
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  // useEffect(() => {
  //   requestPlanet();
  // });
    
  const [visibleM, setVisibleM] = useState(false);
  const [visibleP, setVisibleP] = useState(false);
  const [fileList, setFileList] = useState([{
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }]);
  const [previewVisible, setPreviewVisible] =useState(false);
  const [previewImage, setPreviewImage] =useState('');
  const [previewTitle, setPreviewTitle] =useState('');
  const [planetName, setPlanetName] =useState('');
  const [planetTag, setPlanetTag] =useState('friend');
  const { SubMenu } = Menu;


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
  requestPlanet();
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
            <Menu.Item key="2" icon={<UserOutlined size={18}></UserOutlined>}>Friend</Menu.Item>
            <Menu.Item key="3" icon={<BellOutlined size={18}></BellOutlined>}>Message</Menu.Item>
            <Menu.Item key="4"icon={<RocketOutlined size={18}/>}>Planet</Menu.Item>
            <Button className='newMoment' type="primary" shape="round" onClick={requestPlanet }>New Moment</Button>
          <Button className='newMoment' type="primary" shape="round" onClick={() => setVisibleP(true) }>New Planet</Button>
        </Menu>
        
      {/* </div> */}
      <div className='right-part'>
        <div className='top-bar'>
        {allCard}
        </div>
        <div className='content'>
          <div className='content-moment'>
            <Moment></Moment>
            <Moment></Moment>
          </div>
          <UserInfo></UserInfo>
        </div>
      </div>
      <Modal
        title="Modal 1000px width"
        centered
        visible={visibleM}
        onOk={() => setVisibleM(false)}
        onCancel={() => setVisibleM(false)}
        width={1000}
      >
        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
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