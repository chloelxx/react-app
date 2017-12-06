import React,{ Component }  from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css'
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
export default class Aside extends Component {
   /* render() {
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
    }*/
    rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    state = {
        openKeys: ['sub1'],
    };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    render() {
        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ width: 240 }}
            >
                <Menu.Item key="sub1">
                    <Link to="/">Home</Link>
                </Menu.Item>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span><Link to="/bannerConfig">banner配置</Link></span></span>}>
                </SubMenu>
                <Menu.Item key="sub4">
                    <Link to="/merchantMan">商户管理</Link>
                </Menu.Item>
                <Menu.Item key="sub5" >
                    <Link to="/messageMan">消息管理</Link>
                </Menu.Item>
                <Menu.Item key="sub3">
                    <Link to="/APIDosMan">API文档管理</Link>
                </Menu.Item>
                <Menu.Item key="sub6">
                    <Link to="/permissionMan">权限管理</Link>
                </Menu.Item>
            </Menu>
        );
    }
}