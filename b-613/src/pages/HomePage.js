
import './HomePage.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Layout,Sider,Header,Content,Footer } from 'antd';
import { PoweroffOutlined,AlertOutlined,CommentOutlined,EyeInvisibleOutlined, EyeTwoTone, UserOutlined, SearchOutlined, LockOutlined, HomeOutlined, ThunderboltOutlined,StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Directions } from '@mui/icons-material';
import logo from '../picture/logo.png'





function HomePage() {
  var o = new Image;
  o.src = '../2.png';
  const hide1 = () => {
    document.getElementById("form1").style.display="block";
    document.getElementById("form2").style.display="none";
    document.getElementById("form3").style.display="none";
    };
  const hide2 = () => {
    document.getElementById("form1").style.display="none";
    document.getElementById("form2").style.display="block";
    document.getElementById("form3").style.display="none";
    };
  const hide3 = () => {
    document.getElementById("form1").style.display="none";
    document.getElementById("form2").style.display="none";
    document.getElementById("form3").style.display="block";
    };

  const goToLogin = () => {
    window.location.href="/";
  };
  const goToRegister = () => {
    window.location.href="/register";
  };


  return (
    <div className='page-1'>
      <div className='left-menu'>
      <div className='test'>
      <>
            <img src={logo} alt="logo" />
        </>
      </div>
        <div className='test'>
        News Feeds
          <div className='test1'>
            <Button className='menu-button' onClick={goToLogin}><HomeOutlined className="site-form-item-icon" /></Button>
            <div>
              Personal Profile
            </div>
          </div>
          <div className='test1'>
            <Button className='menu-button' onClick={goToLogin}><HomeOutlined className="site-form-item-icon" /></Button>
            <div>
              My Groups
            </div>
          </div>
          <div className='test1'>
            <Button className='menu-button' onClick={goToLogin}><HomeOutlined className="site-form-item-icon" /></Button>
            <div>
              Newsfeed
            </div>
          </div>


        </div>
        
        <div className='test'></div>
      </div>
      <div className='right-part'>
        <div className='top-bar'>
          
          <Button className='Button_top' onClick={goToLogin}><HomeOutlined className="site-form-item-icon" /></Button>
          <Button className='Button_top' onClick={goToLogin}><ThunderboltOutlined className="site-form-item-icon" /></Button>
          <Button className='Button_top' onClick={goToLogin}><UserOutlined className="site-form-item-icon" /></Button>
          <Button className='Button_top' onClick={goToLogin}><StarOutlined className="site-form-item-icon" /></Button>

          <Button className='Button_top' onClick={goToLogin}><AlertOutlined className="site-form-item-icon" /></Button>
          <Button className='Button_top' onClick={goToLogin}><CommentOutlined className="site-form-item-icon" /></Button>
          <Button className='Button_top' onClick={goToLogin}><StarOutlined className="site-form-item-icon" /></Button>
          <Button className='Button_top' onClick={goToLogin}><PoweroffOutlined className="site-form-item-icon" /></Button>
        </div>
        


        <div className='content'>
        <Form
            name="person"
            className="person-form"
          >
            <Form.Item>
            <Button onClick={goToLogin} className="person-button">
                <> </>
            </Button>
            </Form.Item>

            <Form.Item>
              <h>Username<br></br>UserEmail</h>
            </Form.Item>
            <Form.Item>
            <Button onClick={goToLogin} className="add-friend-button">
                ADD FRIEND
              </Button>
            </Form.Item>
        </Form>


        <Button onClick={hide1} className="switch-button">
                form 1
        </Button>
        <Button onClick={hide2} className="switch-button">
                form 2
        </Button>
        <Button onClick={hide3} className="switch-button">
                form 3
        </Button>



        <Form
            name="form1"
            className="form1"
            id ="form1"
          > 
            111
        </Form>
 
        <Form
            name="form2"
            className="form2"
            id ="form2"
          >
            222
        </Form>

        <Form
            name="form3"
            className="form3"
            id ="form3"
          >
            333
        </Form>



        </div>
      </div>
    </div>
  );
}

export default HomePage;