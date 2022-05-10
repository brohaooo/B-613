
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
import Friend from "./FriendsPage.js";
import Message from "./MessagePage.js";
import Planet from "./PlanetsPage.js";
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

  const changePic = (FL) => {
    let fileData = FL;
    console.log('eeeeeeee: ', fileData);
    let formdata = new FormData();
    formdata.append("file", fileData);
    formdata.append("posterID", cookie.load('id'));
    formdata.append("text",momentText);
    formdata.append("RCID",momentPlanet);
    formdata.append("mood",'happy');
    setMoment(formdata);
    // console.log(formdata.get('id'));
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

  const selectPlanet = ({ value: newValue }) => {
    setPlanetTag(newValue);
    console.log(newValue)
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
      setValue('1');
  };

  const requestPlanet = () => {
    console.log(cookie.load('token'));
    axios.defaults.withCredentials=true;
    axios.defaults.headers.common["token"] = cookie.load('token');
    axios.get('http://localhost:8080/api/members/' + cookie.load('id'))
      .then(function (response) {
        console.log(response.data);
        setPlanetList(response.data);
        setCurrentPlanet(response.data[0].id);
        requestPlanetMoment(response.data[0].id);
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }

  const requestPlanetMoment = (currentP) => {
    setMomentContentList([]);
    console.log(cookie.load('token'));
    axios.defaults.withCredentials=true;
    axios.defaults.headers.common["token"] = cookie.load('token');
    axios.get('http://localhost:8080/api/posts/RCID/' + currentP)
      .then(function (response) {
        let firstResponse = response.data;
        setMomentList(response.data);
        console.log("posts: ",response.data);
        var p = [];
        for(let i=0;i<response.data.length;i++){
          axios.defaults.withCredentials=true;
          axios.defaults.headers.common["token"] = cookie.load('token');
          axios.get('http://localhost:8080/api/posts/' + firstResponse[i].id)
            .then(function (response) {
              let secondResponse = response.data;
              axios.defaults.withCredentials=true;
              axios.defaults.headers.common["token"] = cookie.load('token');
              axios.get('http://localhost:8080/api/users/' + firstResponse[i].posterID)
                .then(function (response) {
                  setMomentContentList(preState => [...preState,<Moment 
                    username = {response.data.userName} 
                    content = {secondResponse.text}
                    picture = {firstResponse[i].postPicSrc}
                    avatar = {response.data.picture}
                    ></Moment>]);
                  console.log('ppppppp111!: ',p);
                })
                .catch(function (error) {
                  console.log(error);
                }); 
              var p = momentContentList;
            })
            .catch(function (error) {
              console.log(error);
            }); 
      };
      })
      .catch(function (error) {
        console.log(error);
      }); 
  }

  const  handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') { //上传成功
        setLoading(false);
        console.log(info);
        setIamgeUrl(info.file.response.info);
    }
  };
 
    
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
  const [displayPage, setDisplayPage] =useState('home');
  const [imageUrl,setIamgeUrl]=useState('');
  const [loading,setLoading]=useState(false);

  const [value, setValue] = useState(''); //used to make useEffect onlyrender one time
  const { SubMenu } = Menu;
  
  
  useEffect(() => {
    requestPlanet();
  }, [value]);

  var allCard = [];
  var selectPlanetList = [];
console.log('momentContentList: ', momentContentList);
  
for(let i=0;i<planetList.length;i++){
    selectPlanetList.push(
      <Option value={planetList[i].id}>{planetList[i].rcName}</Option>
    )
    allCard.push(<Card
            onClick={() => {setCurrentPlanet(planetList[i].id);
              requestPlanetMoment(planetList[i].id)}}
            className='card'
            hoverable
            style={{ width: 100, height: 100,flexShrink: 0, marginRight: '15px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems:'center' }}
            cover={<div style={{width: '100%',display: 'flex',justifyContent:'center'}}><img style={{width: '40%', marginTop: '30%'}} src = {require('../picture/planet_logo.PNG')}></img></div>}
          >
            <div className='cardTitle' >{planetList[i].rcName}</div>
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
            <Menu.Item key="1" onClick ={() =>{setDisplayPage('home');}} icon={<HomeOutlined size={18}></HomeOutlined>}>HomePage</Menu.Item>
            <Menu.Item key="2" onClick ={() =>{setDisplayPage('friend');}} icon={<UserOutlined size={18} ></UserOutlined>}>Friend</Menu.Item>
            <Menu.Item key="3" onClick ={() =>{setDisplayPage('message')}} icon={<BellOutlined size={18} ></BellOutlined>}>Message</Menu.Item>
            <Menu.Item key="4" onClick ={() =>{setDisplayPage('planet')}} icon={<RocketOutlined size={18} />}>Planet</Menu.Item>
            <Button className='newMoment' type="primary" shape="round" onClick={() => setVisibleM(true) }>New Moment</Button>
        </Menu>
        
      {/* </div> */}
      <div className='right-part'>
        {displayPage==='home'?<div className='top-bar'>
        {allCard}
        </div>: null}
        <div className='content'>
          <div className='content-moment'>
            {displayPage==='home'?momentContentList : displayPage==='friend'? <Friend></Friend> : displayPage==='message' ? <Message></Message>:<Planet></Planet>}
          </div>
          <UserInfo></UserInfo>
        </div>
      </div>
      <Modal
        title="New Moment"
        centered
        visible={visibleM}
        onOk={handelNewMoment}
        onCancel={() => setVisibleM(false)}
        width={500}
      >
        <TextArea rows={4} placeholder="maxLength is 200" maxLength={200} onChange={(e) => {setMomentText(e.target.value)}} />
        <Select   style={{ width: '100%', marginTop: '10px' }} onChange={(value) => {
          setMomentPlanet(value);
          console.log(`select${value}`)}}>
          {selectPlanetList}
        </Select>
        {/* <Select defaultValue='happy' style={{ width: '100%', marginTop: '10px' }} onChange={(value) =>{
          setMomentMood(value)
        }}>
          <Option value="happy">Happy</Option>
          <Option value="normal">Normal</Option>
          <Option value="bad">Bad</Option>
        </Select> */}
        {/* <input type="file" name="file" multiple="multiple" id="uploadimg1" onChange={changePic}/> */}
        <Upload
            multiple={false}
            //陈列样式，现在是卡片式
            listType="picture-card"
            beforeUpload={() => {
                //阻止上传
                return false;
            }}
            onChange={(info) => { setFileList(info.fileList);
              changePic(info.file);
            console.log('pictureeeeeee',info) }}
            action=''
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </Modal>

    </div>


  );
}

export default HomePage;