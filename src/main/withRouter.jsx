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
        const pathname = this.props.location.pathname
        console.log("AuthRouter:",pathname)
        if (this.filterPathName()) {
            return null;
        }
        if(cook.getCookieVal("username")) {
            if(pathname=="/main") {
                this.props.history.push("/main/banner");
            }else if(pathname=="/"){
                this.props.history.push("/login");
            }
        }else{
            this.props.history.push('/login')
        }
    }
    render() {
        return (
            null
        );
    }
}

export default withRouter(AuthRoute);