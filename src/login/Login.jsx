import React,{Component} from "react";
import ajax from "../ajax/ajax"
import cookies from "../common/common.js"
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
        console.log("this.state:",this.state);
    }
    login(e){
        e.preventDefault();
        e.stopPropagation()
        var that=this;
        console.log("click")
        var cook=new cookies();
        var params={username:"admin",pwd:"123456"}
         ajax("http://127.0.0.1:3001/login","POST",JSON.stringify(params)).then(function(){
             window.history.pushState(null,null,"/")
             that.props.handelState(false);
             cook.setCookies("username","admin","/","7")
         })
        // console.log("state:",this.state);
        /*this.state={isLogin:true};
        setState*/



    }
    render(){
        return(
            <div>
                <label>用户名：<input type="text" /></label>
                <label>密码：<input type="password" /></label>
                <button onClick={this.login}> 确认</button>
            </div>
        )
    }
}

export default Login