import React,{ Component }  from "react";
import {Route,Switch,Redirect,IndexRoute   } from "react-router-dom";
import Homepage from "../components/banner/HomePage.jsx";
import MerchantMan from "../components/merchant/MerchantList.jsx";
import HelpList from "../components/helpcenter/HelpList.jsx";
import Message from "../components/message/MessageList.jsx"
import APIDosMan from "../components/apiDos.jsx";
import PermissionMan from "../components/PermissionMan.jsx";
import AddBanner from "../components/banner/AddBanner.jsx"
import helpDetail from "../components/helpcenter/HelpDetail.jsx"
import AddMerchant from "../components/merchant/AddMerchant.jsx"
import AddHelpDetail from "../components/helpcenter/AddHelpDetail.jsx"
const RouterCom =({ match }) =>(
            <Switch>
                {/*<Route path="">*/}
                {/*exact component={Homepage} */}
                   {/*<Route path="/index" exact component={Homepage} /> /!*加上了exact就只会匹配路由的一个，如果没有exact就点击的路由的所有组件都会渲染*!/*/}

                    <Route path="/main/banner" component={Homepage} {...this.props}/>
                    <Route path="/main/company" component={MerchantMan} />
                    <Route path="/main/message" component={Message} />
                    <Route path="/main/helpType" component={HelpList}/>
                    <Route path="/main/apiGroup" component={APIDosMan} />
                    <Route path="/main/role" component={PermissionMan} />
                    <Route path="/main/addBanner" component={AddBanner} />
                    <Route path="/main/helpDetail" component={helpDetail} />
                    <Route path="/main/helpDetailInsert" component={AddHelpDetail} />
                    <Route path="/main/helpDetailModify" component={AddHelpDetail} />
                    <Route path="/main/addMerchant" component={AddMerchant} />
                    <Redirect from="/main/*" to="/main/banner"/>    {/*路由重定向，当在以上路径中没匹配到，就跳转到/banner路径的路由下*/}
                    {/*</Route>*/}
                {/*</Route>*/}
                {/*<Redirect from="*" to="/banner"/>    /!*路由重定向，当在以上路径中没匹配到，就跳转到/banner路径的路由下*!/*/}
            </Switch>

)
export default RouterCom