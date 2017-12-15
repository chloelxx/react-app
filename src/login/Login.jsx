import React,{Component} from "react";
import api from "../ajax/api.js"
import cookies from "../common/common.js"
import md5 from 'js-md5'
import {message} from 'antd';
/*const Login = () =>
    <div>
        <label>用户名：<input type="text" /></label>
        <label>密码：<input type="password" /></label>
        <button> 确认</button>
    </div>;*/
class Login extends Component{
    constructor(props){
        super(props);
        this.login=this.login.bind(this);
    }
    login(e){
        e.preventDefault();
        e.stopPropagation()
        var that=this;
        console.log("click")
        var cook=new cookies();
        var params={
            account:this.refs.username.value,
            password: md5(this.refs.pwd.value),
        }
        console.log("param:",this.props);
         api.login(params).then(res=>{
             cook.setCookies("username","admin","/","7")
             console.log("res login:",res)
             message.success(res.msg)
             this.props.history.push("/main/banner")
           //  that.props.handelState(false);
         }).catch((res)=>{
             message.error(res.msg)
         })
    }
    render(){
        console.log("Login:")
        return(
            <div>
                <label>用户名：<input type="text" ref="username"/></label>
                <label>密码：<input type="password" ref="pwd"/></label>
                <input type="submit" onClick={this.login} value= "确认" />
            </div>
        )
    }
}

export default Login