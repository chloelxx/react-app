import React,{ Component }  from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css'
import { Menu, Icon } from 'antd';
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
    };
    constructor(props){
        super(props);
        console.log("path linkCom props:",this.props);
    }
    componentDidMount(){
        console.log("componentDidMount")
        this.getMeunList()
    }
    componentWillMount(){
        console.log("componentWillMount")
       // this.getMeunList()
    }
    componentWillUpdate(){
        console.log("componentWillUpdate")
        //this.getMeunList()
    }
    componentWillReceiveProps(){
        console.log("componentWillReceiveProps")
        //this.getMeunList()
    }
    componentDidUpdate(){
        console.log("componentDidUpdate")
        //this.getMeunList()
    }
    getMeunList(){
        console.log("willMount")
        Api.getMenuPermissions().then((res)=>{
            console.log("res willMount:");
          //  this.setState({menu:res.bizData});
           
            this.matchMenuData(res.bizData);
        })
        console.log("will mount getMeunList state:",this)
    }
    matchMenuData(msg){
       let meun=[]
       let operator={}
       for(let i in msg){
           var index=i.indexOf(":list"),
               keyGrop=i.slice(0,i.indexOf(":")),
               detail=i.slice(i.indexOf(":")+1);
           if(!operator[keyGrop]){
               operator[keyGrop]={};
           }
           operator[keyGrop][detail]=msg[i];
           if(index>-1&&msg[i]){
               var key=i.slice(0,index);
               var value=this.getMenuText(key);
               if(value){
                   meun.push({key:key,text:value});
                   // meun[key]=value
               }
           }

       }
       this.setState({menuData:meun})
        console.log("router state:",this.state,operator);
        this.props.dispatch({type:"menudata",payload:operator})

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
    render() {
        const  menuData=this.state.menuData;
        console.log("render meun:",this.menuData)
        const { dispatch, menuItems } = this.props;
        console.log("LinkCom redux this props:",this.props);
        return (
            <div>
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    style={{ width: 240 }}

                >
                    {menuData.map( (item,index)=> {
                        return (
                            <Menu.Item key={index}>
                                <Link to={"/"+item.key}>{item.text}</Link>
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
    menuItems: React.PropTypes.array,
}


// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
    console.log("LinkCOm contain select is sign connent(select) state args param:",state)
    return {
        menuItems:state.todos,
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(Aside)