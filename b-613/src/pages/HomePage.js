
import './HomePage.css';
import { Layout,Sider,Header,Content,Footer } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

function HomePage() {
  const goToLogin = () => {
    window.location.href="/";
  };
  const goToRegister = () => {
    window.location.href="/register";
  };
  return (
    <div className='page-1'>
      <div className='left-menu'>
        <div className='test'></div>
        <div className='test'></div>
        <div className='test'></div>
      </div>
      <div className='right-part'>
        <div className='top-bar'>
        
        </div>
        <div className='content'>
        
        </div>
      </div>
    </div>
  );
}

export default HomePage;
