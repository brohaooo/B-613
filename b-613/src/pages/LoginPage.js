
import './LoginPage.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

function LoginPage() {
  const goToLogin = () => {
    window.location.href="/";
  };
  const goToRegister = () => {
    window.location.href="/register";
  };
  return (
    <div className="page">
      <div className="totalBox">
        <div className='right' background="./picture/login.jpg" >
          <div className='header'>
            <Button className='Button_h' onClick={goToLogin}>Login</Button>
            <Button className='Button_h' onClick={goToRegister}>Register</Button>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
          >
            <Form.Item>
              <h>Login Into<br></br> Your Account</h>
            </Form.Item>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Username" 
              className='login-input'
              size='large'/>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                className='password-input'
                size='large'
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item className='item-register'>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              Or <a href="./register">register now!</a>
            </Form.Item>
          </Form>
          
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
