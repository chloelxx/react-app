import React,{Component} from 'react';
import "../asset/main.css"
import cookies from "../common/common"
import { Form, Input, Upload, Icon, message, Button,Modal } from 'antd';
import api from "../ajax/api.js"
export default class Header extends Component{
    state={
        visible:false,
    }
    constructor(props){
        super(props);
        this.logout=this.logout.bind(this)
    }
    logout(){
      /*  console.log("this.logout")
        window.history.pushState(null, null, '/login');
        this.props.handelState(true);*/

        this.setState({visible:true});

    }
    handleCancel=(e)=>{
        this.setState({visible:false});
    }
    handleOk=(e)=>{
        console.log("header this.props:",this.props)
        api.loginOut().then((data)=>{
            message.success("退出成功")
            this.props.history.push('/login');
        }).catch((data)=>{
            message.error(data.msg);
            if(data.rtnCode=="biz_error_20002"){
                this.props.history.push("/login");
            }
        })
    }
    render(){
        var name=new cookies().getCookieVal("username")
        return (
            <div className="header">
               <div className="logo">logo</div>
                <div className="userInfo">
                    {name}
                    <span onClick={this.logout} style={{cursor:"pointer",marginLeft:"20px"}}>退出</span>
                </div>
                <Modal
                    visible={this.state.visible}
                    title="提示"
                    onOk={this.handleOk}
                    className="helpCenter"
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>取消</Button>,
                        <Button key="submit" type="primary"
                                onClick={this.handleOk}>
                            确定
                        </Button>,
                    ]}
                    bodyStyle={{textAlign:"center"}}
                >
                    <p style={{textAlign:"center"}}>是否退出当前账号</p>

                </Modal>
            </div>
        )
    }
}
