import React,{Component} from 'react';
import "../asset/main.css"
import cookies from "../common/common"

export default class Header extends Component{
    constructor(props){
        super(props);
        this.logout=this.logout.bind(this)
    }
    logout(){
        console.log("this.logout")
        window.history.pushState(null, null, '/login');
        this.props.handelState(true);

    }
    render(){
        var name=new cookies().getCookieVal("username")
        return (
            <div className="header">
               <div className="logo">logo</div>
                <div className="userInfo">{name}<span onClick={this.logout} style={{cursor:"pointer",marginLeft:"20px"}}>退出</span></div>
            </div>
        )
    }
}
