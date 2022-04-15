
import './InfoEdit.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { Layout,Sider,Header,Content,Footer } from 'antd';
import { RocketOutlined,TeamOutlined,PoweroffOutlined,NotificationOutlined,AlertOutlined,CommentOutlined,EyeInvisibleOutlined, EyeTwoTone, UserOutlined, SearchOutlined, LockOutlined, HomeOutlined, ThunderboltOutlined,StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Directions } from '@mui/icons-material';
import logo from '../picture/logo.png'





function InfoEdit() {

  const goToLogin = () => {
    window.location.href="/";
  };
  const goToRegister = () => {
    window.location.href="/register";
  };
  const goToHomePage = () => {
    window.location.href="/home";
  };
  const showFriends = () => {
    window.location.href="/home";
  };

  return (

<div id="main" class="container">

    <div class="row">
        <div id="window" class="col-xs-12 col-md-6 col-md-offset-3">
            <div class="tab-content">

                <div id="d0" class="tab-pane fade in active">
                    <div class="panel panel-default panel_content">
                        <div class="panel-heading text-center">
                            <h3 class="panel-title">
                                <b>Welcome to edit your profile</b>
                            </h3>
                        </div>

                        <div class="panel-body-d0">
                            <div class="center">
                                <div class="name">
                                    <table class="table">
  
                                        <tr>
                                            <td class="text-center font-color">Only your name/ID is necessary. </td>
                                        </tr>
                                        <tr>
                                            <td class="text-center font-color">Start editing！</td>
                                        </tr>
                                    </table>
                                </div>

                              
                               

                            </div>
                        </div>

                    </div>
                </div>


                <div id="d1" class="tab-pane fade">
                    <div class="panel panel-default panel_content">
                        <div class="panel-heading text-center">
                            <h3 class="panel-title ">
                                <b>Enter your info.</b>
                            </h3>
                        </div>
                        <div class="panel-body">
                            <div class="center">
                                <div class="name">
                                    <div class="input-group">
                                        <span class="input-group-addon">Your Name/ID</span>
                                        <Input type="text" class="form-control"  placeholder="请输入"/>
                                    </div>
                                </div>
    
                                
                                <div class="double div-margin">
                                    <p class="cneter_title text-center">Your Gender</p>
                                    <div class="center_content btn-group" data-toggle="buttons">
                                        <label class="btn btn-primary" onClick="nv">
                                            <Input type="radio" name="options" value="0" v-model="user.sex" id="sex0"/>
                                            Female
                                        </label>
                                        <label class="btn btn-primary" OnClick="nan">
                                            <Input type="radio" name="options" value="1" v-model="user.sex" id="sex1"/>
                                            Male
                                        </label>
                                    </div>
                                </div>


                                <div class="address div-margin">
                                    <div class="input-group">
                                        <span class="input-group-addon">Your Age:</span>
                                        <Input type="text" class="form-control" 
                                               placeholder="请输入"/>
                                    </div>
                                </div>


                                <div class="mask">
                                    <p class="cneter_title text-center">Upload Your Profile Picture:</p>
                                    <Input id="input-b1" name="input-b1" type="file" class="file"
                                           data-browse-on-zone-click="true"/>
                                </div>


                               
      
  
   
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

                

               
  );
}

export default InfoEdit;