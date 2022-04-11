
import './RegisterPage.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined,UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

function RegisterPage() {
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
              <h>Create<br></br> Your Account</h>
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
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input 
              prefix={<MailOutlined/>}
              placeholder="E-mail"
              size='large'/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                className='password-input'
                size='large'
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />} 
              placeholder="Confirm Password" 
              className='login-input'
              size='large'/>
            </Form.Item>
            

            <Form.Item className='item-register'>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Register
              </Button>
              Already have account <a href="/">Login</a>
            </Form.Item>
          </Form>
          
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
