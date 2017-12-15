import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import cookies from "../common/common"
/**
 * 检测路由组件
 */
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
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return true
        } else {
            return false
        }
    }
    componentDidMount() {
        var cook=new cookies();
        if (this.filterPathName()) {
            return null
        }
        // if(cook.getCookieVal("username")) {
        //     this.props.history.push("/main/banner");
        // }else{
        //     window.history.pushState(null, null, '/login')
        // }

    }
    render() {
        return (
            null
        );
    }
}

export default withRouter(AuthRoute);