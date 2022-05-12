import './SucceedToRegisterPage.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

import s from '../picture/congrat.png'

// page that show the success register information
function SucceedToRegisterPage(){

    return (
        <div className='success'>

            <div className='congrat'>
                <img src={s} alt="s" />
            </div>
            <div className='word'>
                Successful registration!<br></br>
                <a href="/">Click here</a> to jump to the login page!
            </div>
        </div>


    );
}

export default SucceedToRegisterPage;
