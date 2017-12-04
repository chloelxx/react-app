import React,{Component} from "react";
// import axios from 'axios';
// import { withRouter } from 'react-router-dom';

/**
 * 检测路由组件
 */
// @withRouter
class AuthRoute extends Component {
    constructor(props) {
        super(props)
        this.filterPathName = this.filterPathName.bind(this)
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
        // // 获取用户信息
        // axios.get('/user/info').then(res => {
        //     if (res.status === 200) {
        //         // 对登录信息做过滤，为0则登录成功
        //         if (res.data.code === 0) {
        //             //有登陆信息
        //         } else {
        //             //无登录信息，跳转登录页
        //             this.props.history.push('/login')
        //         }
        //         // console.log(res.data);
        //     }
        // })
    }
    render() {
        return (
            null
        );
    }
}

export default AuthRoute;