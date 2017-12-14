import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from "../layout/Header"
import LeftMenu from "../layout/LeftMenu"
import MainBody from "../layout/MainBody"
import Footer from "../layout/Footer"
import Login from "../login/Login.jsx"

import { BrowserRouter, Route, Link } from "react-router-dom";

import { connect } from 'react-redux'
import cookies from "../common/common"
import { todo, list, filters } from '../redux/action.jsx'
import Api from "../ajax/api.js"
// export default class Main extends Component
class Main extends Component{
    state={
        isLogin:true
    }
    constructor(props) {
        super(props)
        this.filterPathName = this.filterPathName.bind(this)
        console.log("props:",this.props);
        this.state = this.state
        console.log("this.state:",this.state);
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
        console.log("mainBOdy willMount:")
       // this.getMeunList()
    }
    componentDidMount() {
        var cook=new cookies();
        if (this.filterPathName()) {
            console.log("filterPathName");
            return null
        }
        if(cook.getCookieVal("username")) {
            console.log("username",cook.getCookieVal("username"));
            this.handelState(false)
        }else{
            window.history.pushState(null, null, '/login')
        }
    }
    handelState(params){
        console.log("params:",params);
        this.setState({
            isLogin:params
        })
    }
     render(){
         const { dispatch, items } = this.props;
         console.log("Main this.props:",this.props);
         return (
             <div>

                 {this.state.isLogin? <Login handelState={isLogin=>this.handelState(isLogin)} />
                     :<div >
                     <Header  handelState={isLogin=>this.handelState(isLogin)} />
                     <LeftMenu />
                     {/*<MainBody />*/}
                     <Footer />
                 </div>}

             </div>

         )
     }
}

Main.propTypes = {
    items:React.PropTypes.array,
}


// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    console.log("contain select is sign connent(select) state args param:",state)
    return {
        items:state.todos,
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(Main)