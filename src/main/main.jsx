import React,{Component} from 'react';


import Homepage from "../components/HomePage.jsx";
import BannerConfig from "../components/BannerConfig.jsx";
import MerchantMan from "../components/merchant/MerchantList.jsx";
import HelpList from "../components/helpcenter/HelpList.jsx";
import Message from "../components/message/MessageList.jsx"
import APIDosMan from "../components/apiDos.jsx";
import PermissionMan from "../components/PermissionMan.jsx";
import AddBanner from "../components/AddBanner.jsx"
import helpDetail from "../components/helpcenter/HelpDetail.jsx"
import Login from "../login/Login.jsx"
import Header from "../layout/Header.jsx"
import Footer from "../layout/Footer.jsx"
import { BrowserRouter, Route, Redirect,withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import cookies from "../common/common"
import AthRouter from "./withRouter.jsx"
import { todo, list, filters } from '../redux/action.jsx'
import LeftMenu from "../layout/LeftMenu";

import Body from "../layout/Body.jsx"

class Main extends Component{
    state={
        isLogin:true,
        show:"none"
    }
    constructor(props) {
        super(props)
        console.log("withRouter:",this.props)
        this.filterPathName = this.filterPathName.bind(this)
        this.state = this.state
    }
    /**
     * 过滤目标地址
     */
    filterPathName() {
        const publicList = [
            '/login',
            '/register'
        ]
        console.log("props:",window.location.pathname);
        const pathname = window.location.pathname

        if (publicList.indexOf(pathname) > -1) {
             this.handelState(true)
            return true
        } else {
            return false
        }
    }
    componentWillMount(){
        this.filterPathName()
    }
    componentDidMount() {
        this.handelState(true)
        this.filterPathName()
        console.log("filterPathName:",this.props.history);
        if (this.filterPathName()) {
            console.log("filterPathName:",this.props.history);
            return null
        }

    }
    handelState(params){
        this.setState({
            isLogin:params
        })
    }
     render(){
         const { dispatch, items } = this.props;
         {/* <div>
                {this.state.isLogin?  <Login handelState={isLogin=>this.handelState(isLogin)} />
                 :<div >
                     <Header  handelState={isLogin=>this.handelState(isLogin)} />
                     <LeftMenu />
                     <Footer />
                 </div>}
             </div>*/}

         return (

         <BrowserRouter>
             <switch>
                 <AthRouter></AthRouter>
                 <Route path="/login" component={Login}/>
                 <Route path="/main" component={Body}/>

             </switch>
         </BrowserRouter>
         )
     }
}

Main.propTypes = {
    items:React.PropTypes.array,
}


// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        items:state.todos,
    }
}

const tt=connect(select)(Main)
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(Main)