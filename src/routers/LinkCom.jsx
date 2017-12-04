import React,{ Component }  from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default class Aside extends Component {
    render() {
        return (
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/bannerConfig">banner配置</Link>
                </li>
                <li>
                    <Link to="/merchantMan">商户管理</Link>
                </li>
                <li>
                    <Link to="/messageMan">消息管理</Link>
                </li>
                <li>
                    <Link to="/APIDosMan">API文档管理</Link>
                </li>
                <li>
                    <Link to="/permissionMan">权限管理</Link>
                </li>
            </ul>
        )
    }
}