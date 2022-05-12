
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

// transform the file into base 64 encode
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
  //load the token from the cookie
  const token = cookie.load('token');

  // handle the upload operation of the picture, and push all the data into form data
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
  };

  // self- defined upload button
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  // when click the ok button of the modal, submit the form data to the back end
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

  // request all the data that the user owns and set the planets list to the state
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

// request the moments that from the planet from the back end
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

 
    // self defined states used in this function
  const [visibleM, setVisibleM] = useState(false);
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
  
  // use useEffect to reload the page
  useEffect(() => {
    requestPlanet();
  }, [value]);

  var allCard = [];
  var selectPlanetList = [];

  // new object variable to stored  all the cards that store the planets
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
      {/* left part menu */}
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
        
      <div className='right-part'>
        {/* top bar that display the planets */}
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
      {/* modal that used to create new moment */}
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
        <Upload
            multiple={false}
            listType="picture-card"
            beforeUpload={() => {
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