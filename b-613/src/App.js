import logo from './logo.svg';
import './App.css';
import { Form, Input, Button, Checkbox } from 'antd';

function App() {
  return (
    <div className="page">
      <div className='header'></div>
      <div className="totalBox">
        <div className='left'></div>
        <div className='right'>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder='Your Email Address'/>
            </Form.Item>

            <Form.Item
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder='Password' visibilityToggle = {false}/>
            </Form.Item>

            <Form.Item >
              <Button className='LoginButton'>
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
