
import './Moment.css';
import { Form, Input, Button, Checkbox , Avatar, Card, Image} from 'antd';
import {  UserOutlined, LockOutlined, SmileOutlined,HeartOutlined, CommentOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useState } from 'react';
import axios from 'axios';


// self defined moment card that display the detailed moment data
function Moment(props) {

  return (
    <div className="moment">
      {/* the avatar of the user */}
      <div className='moment-left'>
        <Avatar size={50} src={props.avatar!=='default.png'?require(`../../../back-end/upload/${props.avatar}`):require(`../picture/ufo.png`)}  />
      </div>
      <div className='moment-right'>
        {/* name of the user */}
        <div className='moment-1'>
              <div className='moment-avartar-name'>{props.username}</div>
            </div>
            {/* moment contents: image and the related text */}
            <div className='momment-comment'>
              <p>{props.content}</p>
            </div>
            <Image
              className='moment-image'
              src={require(`../../../back-end/upload/${props.picture}`)}
            />
            <div className='moment-bottom-bar'>
              <div className='likes'>
                <HeartOutlined className='bottom-bar-button' />
                <div className='bottom-bar-number'>1</div>
              </div>
              <div className='likes'>
                <CommentOutlined className='bottom-bar-button'/>
                <div className='bottom-bar-number'>23</div>
              </div>
            </div>
          </div>
      </div>
      
  );
}

export default Moment;
