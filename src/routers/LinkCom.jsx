import React,{ Component }  from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css'
import { Menu, Icon,message } from 'antd';
import Api from "../ajax/api.js"

import { connect } from 'react-redux'

const SubMenu = Menu.SubMenu;
class Aside extends Component {
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
        menuData:[],
        selectedKeys:[],
    };
    constructor(props){
        super(props);
        console.log("path linkCom props:",this.props);
    }
    componentDidMount(){
        console.log("componentDidMount:",this.state.menuData)
       // this.getMeunList();
        this.findActiveSide(this.state.menuData)

    }
    componentWillMount(){
        console.log("componentWillMount")
        this.getMeunList();
        // this.setState({selectedKeys:["2"]})
    }
    componentWillUpdate(){
        console.log("componentWillUpdate")

    }
    componentWillReceiveProps(){
        console.log("componentWillReceiveProps")
       // this.findActiveSide(this.state.menuData)
    }
    /*shouldComponentUpdate(){
        return true;
    }*/
    componentDidUpdate(){
        console.log("componentDidUpdate")
        //this.findActiveSide(this.state.menuData)
    }
    getMeunList(){
        console.log("willMount")
        Api.getMenuPermissions().then((res)=>{
            this.matchMenuData(res.bizData);
        }).catch((data)=>{
            message.error(data.msg);
            if(data.rtnCode=="biz_error_20002"){
                this.props.history.push("/login");
            }
        })
    }
    matchMenuData(msg){
       let meun=[]
       let operator={}
       for(let i in msg){
           var index=i.indexOf(":list"),subMeun=i.replace(":","-");
           operator[subMeun]=msg[i];
           if(index>-1){
               var key=i.slice(0,index);
               var value=this.getMenuText(key);
               if(value){
                   meun.push({key:key,text:value});
               }
           }

       }
        this.findActiveSide(meun)
        this.setState({ menuData:meun})
        this.props.dispatch({type:"menudata",payload:operator})

    }
    findActiveSide(meun){
        console.log("menu:",meun)
        var pathname= this.props.location.pathname,selectedKey="-1";
        for(let i=0,len=meun.length;i<len;i++){
            if(pathname.indexOf(meun[i].key)>-1){
                selectedKey=i.toString();
            }
        }
        console.log("index of:",selectedKey,this.state)
        this.setState({ selectedKeys:[selectedKey]});
    }
    getMenuText(key){
        switch (key){
            case "apiGroup":return "API文档管理";
            case "banner":return "商户banner配置"
            case "company":return "商户管理"
            case "message":return "消息管理"
            case "helpType":return "帮助中心"
            case "role":return "权限管理"
            default:return false;
        }
    }
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
    activeKey=(item, key, keyPath)=>{
        this.setState({selectedKeys:[item.key]})
    }
    render() {
        const  menuData=this.state.menuData;
        const { dispatch, menuItems } = this.props;
        return (
            <div>
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    style={{ width: 240 }}
                    selectedKeys={this.state.selectedKeys}
                    onClick={this.activeKey}

                >
                    {menuData.map( (item,index)=> {
                        return (
                            <Menu.Item key={index} >
                                <Link to={"/main/"+item.key}>{item.text}</Link>
                            </Menu.Item>
                        )
                    })}
                   {/* <Menu.Item key="sub1">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="sub2">
                        <Link to="/bannerConfig">banner配置</Link>
                    </Menu.Item>
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
                    <Menu.Item key="sub7" >
                        <Link to="/helpCenter">帮助中心</Link>
                    </Menu.Item>
*/}
                </Menu>

            </div>
        );
    }
}

Aside.propTypes = {
    menuItems: React.PropTypes.object,
}


// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    return {
        menuItems:state.todos,
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(Aside)