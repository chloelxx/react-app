import React,{Component} from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import app from "../App.js"
import LoginControl from "./togle.jsx"

// 等等。

const RouterCom =({ match }) =>(
    <div>
        <Route path="/" component={HomePage} /> {/*加上了exact就只会匹配路由的一个，如果没有exact就点击的路由的所有组件都会渲染*/}
        <Route path="/user" component={UsersPage} />
        <Route path="/Country" component={app} />
        <Route path="/Info" component={Info} />
        <Route path="/Manger" component={LoginControl} />
        <Route path="/Date" component={Date11} />
        <Route path="/username/:username" component={Username}/>
    </div>
)

const Username = ({ match }) => {
    return <h1>Hello, {match.url}!</h1>
}
const HomePage = () => <h1>Home Page</h1>;
const UsersPage1 =React.createClass({
    getInitialState: function() {
        return {liked: false};
    },
    handleClick: function(event) {
        this.setState({liked: !this.state.liked});
    },
    render: function() {
        var text = this.state.liked ? '喜欢' : '不喜欢';
        return (
            <p onClick={this.handleClick}>
                你<b>{text}</b>我。点我切换状态。
            </p>
        );
    }
});
class UsersPage extends React.Component{
    constructor(props) {
        super(props);
        console.log("this:",this);
        this.state={liked:false};
        //this.handleClick=this.handleClick.bind(this);
        // return {liked: false};
    }
    handleClick=()=> {
        this.setState({liked: !this.state.liked});
    }
    render(){
        var text = this.state.liked ? '喜欢' : '不喜欢';
        return (
            <p onClick={this.handleClick}>
                你<b>{text}</b>我。点我切换状态。
            </p>
        );
    }
}
const Info = () => <h1>liuxingx</h1>;
const Manager = () => <h1>黄晓鹏</h1>;

// const Date11 = () => <h1>{new Date()}</h1>;
const Date11=React.createClass({
    render (){
        return (
            <h3>
                {new Date().toDateString()}
            </h3>
        )
    }
})
export default RouterCom
