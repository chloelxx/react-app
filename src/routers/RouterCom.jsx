import React,{ Component }  from "react";
import {Route,Switch,Redirect,IndexRoute   } from "react-router-dom";
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
const RouterCom =({ match }) =>(
            <Switch>
                {/*<Route path="">*/}
                {/*exact component={Homepage} */}
                   {/*<Route path="/index" exact component={Homepage} /> /!*加上了exact就只会匹配路由的一个，如果没有exact就点击的路由的所有组件都会渲染*!/*/}
                   <Route path="/main/banner" component={Homepage} />
                    <Route path="/main/company" component={MerchantMan} />
                    <Route path="/main/message" component={Message} />
                    <Route path="/main/helpType" component={HelpList} />
                    <Route path="/main/apiGroup" component={APIDosMan} />
                    <Route path="/main/role" component={PermissionMan} />
                    <Route path="/main/bannerConfig/addBanner" component={AddBanner} />
                    <Route path="/main/helpCenterDetail" component={helpDetail} />
                    <Route path="/main/helpCenter/helpCenterModify" component={AddBanner} />
                    <Redirect from="*" to="/main/banner"/>    {/*路由重定向，当在以上路径中没匹配到，就跳转到/banner路径的路由下*/}
                   {/*</Route>*/}
                {/*</Route>*/}
                {/*<Redirect from="*" to="/banner"/>    /!*路由重定向，当在以上路径中没匹配到，就跳转到/banner路径的路由下*!/*/}
            </Switch>

)
export default RouterCom