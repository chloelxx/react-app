import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Header from "../layout/Header"
import LeftMenu from "../layout/LeftMenu"
import MainBody from "../layout/MainBody"
import Footer from "../layout/Footer"
import Login from "../login/Login.jsx"
export default class Main extends Component{
    state={
        isLogin:false
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
            return true
        } else {
            return false
        }
    }

    componentDidMount() {
        if (this.filterPathName()) {
            console.log("filterPathName");
            return null
        }
        window.history.pushState(null,null,'/login')
    }
    handelState(params){
        console.log("params:",params);
        this.setState({
            isLogin:params
        })
    }
     render(){
         return (
             <div>
                 {!this.state.isLogin?<Login handelState={isLogin=>this.handelState(isLogin)} />:<div >
                     <Header />
                     <LeftMenu />
                     {/*<MainBody />*/}
                     <Footer />
                 </div>}

             </div>

         )
     }
}